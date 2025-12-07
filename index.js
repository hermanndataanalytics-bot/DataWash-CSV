import express from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import csvtojson from 'csvtojson';
import { Parser } from 'json2csv';
import _ from 'lodash';
import cors from 'cors';

// -- Fanasana Global Variables sy Path --
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Toerana hitehirizana rakitra voadio.
const PUBLIC_DIR = join(__dirname, 'public');
const DOWNLOADS_DIR = join(PUBLIC_DIR, 'downloads');

// Server configuration
const app = express();
const PORT = process.env.PORT || 3000;

// -- Middleware --

// CORS configuration (Manome antoka fa afaka mifandray ny React UI)
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'OPTIONS'],
}));

// File Upload Middleware (Mandray ny rakitra nalefa)
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
    abortOnLimit: true,
}));

// Manompo ny rakitra static (manome lalana ny front-end hanome ny rakitra voadio)
app.use(express.static(PUBLIC_DIR));

// -- Logic momba ny fanadiovana --
/**
 * Manadio ny data CSV.
 * 1. Manala ny tsipika/spaces tsy ilaina amin'ny sisin'ny sanda rehetra.
 * 2. Manala ny rows banga.
 * 3. Manala ny duplicate rows manontolo.
 * @param {string} csvText - Ilay data CSV.
 * @returns {Promise<string>} - CSV voadio.
 */
async function cleanCsvData(csvText) {
    if (!csvText || csvText.trim() === '') {
        throw new Error('Rakotra CSV banga na tsy misy na inona na inona.');
    }

    // 1. Convert CSV mankany amin'ny JSON
    const jsonArray = await csvtojson().fromString(csvText);

    if (jsonArray.length === 0) {
        throw new Error('Tsy nisy data azo avy amin’ny CSV. Jereo ny format.');
    }

    // 2. Manadio ny sanda tsirairay ary manala ny rows banga
    const cleanedJsonArray = jsonArray
        .map(row => {
            const newRow = {};
            let isRowEmpty = true;
            for (const key in row) {
                // Mampiasa _.trim hanesorana ny spaces amin'ny sisiny
                const cleanedValue = _.trim(String(row[key] || ''));
                newRow[key] = cleanedValue;
                if (cleanedValue !== '') {
                    isRowEmpty = false;
                }
            }
            return isRowEmpty ? null : newRow;
        })
        .filter(row => row !== null); // Manala ny rows banga tanteraka

    if (cleanedJsonArray.length === 0) {
        throw new Error('Tsy nisy data azo taorian’ny fanadiovana (banga daholo).');
    }

    // 3. Manala ny duplicate rows
    // JSON.stringify no ampiasaina hanamarinana raha mitovy tanteraka ny rows
    const uniqueJsonSet = new Set(cleanedJsonArray.map(JSON.stringify));
    const uniqueJsonArray = Array.from(uniqueJsonSet).map(JSON.parse);

    // 4. Mamerina azy ho CSV
    const fields = Object.keys(uniqueJsonArray[0]);
    const json2csvParser = new Parser({ fields });
    const cleanedCsv = json2csvParser.parse(uniqueJsonArray);

    return cleanedCsv;
}

// -- API Routes --

// Route Fandefasana Rakitra (Main Logic)
app.post('/upload', async (req, res) => {
    try {
        // 1. Manamarina raha misy ny rakitra
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'Tsy nahitana rakitra nalefa.', error: 'No file uploaded.' });
        }
        
        // Raisina ilay rakitra antsoina hoe 'csvFile'
        const csvFile = req.files.csvFile; 

        // 2. Famakiana ny rakitra sy fanadiovana
        const csvText = csvFile.data.toString('utf8');
        const cleanedCsv = await cleanCsvData(csvText);

        // 3. Fitehirizana ny valiny
        await fs.mkdir(DOWNLOADS_DIR, { recursive: true }); 

        const uniqueFilename = `cleaned_${Date.now()}.csv`;
        const filePath = join(DOWNLOADS_DIR, uniqueFilename);
        
        // Fitehirizana ny CSV voadio ao amin'ny public/downloads
        await fs.writeFile(filePath, cleanedCsv, 'utf8');

        // 4. Manome valiny ho an'ny Front-end (URL azo ampidinina)
        const cleanedDataUrl = `${req.protocol}://${req.get('host')}/downloads/${uniqueFilename}`;

        return res.status(200).json({
            message: 'Fanadiovana nahomby ary voatahiry ny rakitra.',
            fileName: uniqueFilename,
            cleanedDataUrl: cleanedDataUrl,
        });

    } catch (error) {
        console.error('Fahadisoana nandritra ny fanodinana:', error.message);
        
        // Mamerina hafatra fahadisoana mazava ho an'ny UI
        return res.status(500).json({
            message: 'Tsy nahomby ny fanodinana ny rakitra.',
            error: error.message || 'Fahadisoana anaty server tsy fantatra.',
        });
    }
});

// -- Famelomana ny Server --
app.listen(PORT, async () => {
    console.log(`Server mandeha tsara ao amin'ny port ${PORT}`);

    // Fanombohana: Manome antoka fa misy ny folder downloads
    if (!existsSync(DOWNLOADS_DIR)) {
        await fs.mkdir(DOWNLOADS_DIR, { recursive: true });
        console.log('Folder "downloads" noforonina.');
    }
});