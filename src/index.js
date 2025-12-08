import express from 'express';
import fileUpload from 'express-fileupload';
import csv from 'csvtojson';
import fs from 'fs/promises';
import path from 'path';
import ExcelJS from 'exceljs';
import cors from 'cors';
import crypto from 'crypto';
import React from 'react';
import { createRoot } from 'react-dom/client'; // Ampiasao ny createRoot ho an'ny React 18
import DataWash from './DataWash'; // Miantso ny component avy amin'ny DataWash.jsx

// Ampiasao ny createRoot hampiakarana ny fampiharana
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <DataWash />
        </React.StrictMode>
    );
} else {
    console.error("Failed to find the root element to mount React application.");
}

// --- Global Configuration ---
const PORT = process.env.PORT || 10000;
const DOWNLOADS_FOLDER = 'downloads';

// --- Server Setup ---
const app = express();

// CORS Configuration: Manome alalana ny Render Frontend hifandray
app.use(cors({
    origin: '*', // Ataovy azo antoka fa miasa ny Frontend (React) na aiza na aiza
}));

// Express Middleware: Handray ny files sy ny data
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DOWNLOADS_FOLDER)); // Manome alalana ny download avy amin'ny folder "downloads"

// --- Authentication & Quota Middleware (NEW!) ---
const authMiddleware = (req, res, next) => {
    // 1. Raiso ny User ID avy amin'ny Header
    const userId = req.header('X-User-ID');

    if (!userId) {
        // Tsy maintsy misy User ID (na Auth Token) ny fangatahana rehetra avy amin'ny Frontend
        return res.status(401).json({ 
            error: 'Authentication Required', 
            message: 'User ID (X-User-ID header) is missing. Please log in.' 
        });
    }

    // 2. Tehirizo ny userId ao amin'ny request mba hampiasain'ny lojika manaraka
    req.userId = userId;

    // 3. Tsy maintsy ampidirina koa ny Quota Check eto raha mampiasa Firestore isika.
    // SAINGY: Satria ny Quota dia efa notsapan'ny Frontend (ao amin'ny DataWash.jsx) ary
    // ny Quota marina dia tehirizina ao Firestore, dia avelantsika ny Frontend no hanara-maso izany.
    // Ny Backend kosa dia manamarina ny Auth fotsiny (X-User-ID).

    next(); // Tohizo ny fanodinana ny file (mankany amin'ny /upload)
};

// --- Main Upload Endpoint (Protected by Middleware) ---
app.post('/upload', authMiddleware, async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ 
            error: 'No files were uploaded.', 
            message: 'Tsy misy rakitra CSV nalefa.' 
        });
    }
    
    // Raiso ny User ID efa voamarina
    const userId = req.userId; 
    console.log(`Processing file for user: ${userId}`);

    const csvFile = req.files.csvFile;
    if (!csvFile) {
         return res.status(400).json({ 
            error: 'File field missing.', 
            message: 'Ny rakitra dia tokony ho ao amin\'ny "csvFile" field.' 
        });
    }

    const tempFilePath = path.join(DOWNLOADS_FOLDER, `temp_${Date.now()}.csv`);
    
    try {
        // 1. Tehirizo vonjimaika ny rakitra nalefa
        await fs.writeFile(tempFilePath, csvFile.data);

        // 2. Famakiana sy Fanadiovana (Deduplication)
        let jsonArray = await csv().fromFile(tempFilePath);
        
        // Mampiasa Set ho an'ny fanadiovana (Deduplication)
        const uniqueKeys = new Set();
        const cleanedArray = [];
        
        jsonArray.forEach(row => {
            // Mamorona "key" tokana avy amin'ny soatoavina rehetra ao amin'ny row
            const rowString = JSON.stringify(row);
            if (!uniqueKeys.has(rowString)) {
                uniqueKeys.add(rowString);
                cleanedArray.push(row);
            }
        });

        // Fisoratana ny rakitra voadio ho CSV vaovao
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Cleaned Data');

        if (cleanedArray.length > 0) {
            // Ampidiro ny lohateny (headers)
            const headers = Object.keys(cleanedArray[0]);
            worksheet.addRow(headers);

            // Ampidiro ny angona
            cleanedArray.forEach(row => {
                const values = headers.map(header => row[header]);
                worksheet.addRow(values);
            });
        }
        
        // Mamorona anarana rakitra tokana ho an'ny download
        const hash = crypto.createHash('sha256').update(userId + Date.now().toString()).digest('hex').substring(0, 8);
        const outputFileName = `cleaned_data_${hash}.csv`;
        const outputFilePath = path.join(DOWNLOADS_FOLDER, outputFileName);
        
        // Soraty ao anaty file ny angona ho CSV
        await workbook.csv.writeFile(outputFilePath);

        // Famoahana ny valiny ho an'ny Frontend
        const cleanedDataUrl = `${req.protocol}://${req.get('host')}/${outputFileName}`;

        return res.json({
            message: 'File successfully cleaned and ready for download.',
            cleanedDataUrl: cleanedDataUrl,
            originalRowCount: jsonArray.length,
            cleanedRowCount: cleanedArray.length,
            duplicatesRemoved: jsonArray.length - cleanedArray.length
        });

    } catch (error) {
        console.error('Error during CSV processing:', error);
        return res.status(500).json({ 
            error: 'Internal Server Error', 
            message: 'Nisy olana nandritra ny fanadiovana. Jereo ny format ny CSV.' 
        });
    } finally {
        // Fafao ny rakitra vonjimaika
        try {
            await fs.unlink(tempFilePath);
        } catch (cleanupError) {
            console.error('Error cleaning up temp file:', cleanupError);
        }
    }
});

// Endpoint Fandraisana (Default Route)
app.get('/', (req, res) => {
    res.send('DataWash Pro Max Backend Service. Endpoint /upload is ready.');
});

// --- Server Start ---
(async () => {
    try {
        // Ataovy azo antoka fa misy ny folder "downloads"
        await fs.mkdir(DOWNLOADS_FOLDER, { recursive: true });
        console.log(`Folder "${DOWNLOADS_FOLDER}" noforonina na efa nisy.`);

        app.listen(PORT, () => {
            console.log(`Server mandeha tsara ao amin'ny port ${PORT}`);
        });
    } catch (err) {
        console.error('Error during server startup:', err);
    }
})();