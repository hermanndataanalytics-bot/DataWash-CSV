const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const ExcelJS = require("exceljs");

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(fileUpload());

/* 🔍 Auto-detect CSV delimiter */
function detectSeparator(text) {
    const possible = [",", ";", "\t", "|"];
    return possible.reduce((best, sep) => 
        (text.split(sep).length > text.split(best).length ? sep : best)
    );
}

/* 🧽 Cleaner Engine */
function cleanCSV(data) {
    const sep = detectSeparator(data);
    const rows = data.split(/\r?\n/).map(r => r.split(sep).map(c => c.trim()));

    // Normalize header
    rows[0] = rows[0].map(h => h.replace(/\s+/g, "_").toUpperCase());

    // Clean cells
    let cleaned = rows.map(row => row.map(c => (c === "" ? "NULL" : c)));
    return { cleaned, sep };
}

/* ⬆ CSV Upload + Clean */
app.post("/clean-csv", async (req, res) => {
    if (!req.files || !req.files.file) return res.status(400).send("No file");
    
    const content = req.files.file.data.toString("utf8");
    const { cleaned } = cleanCSV(content);

    return res.json({ status: "success", cleaned });
});

/* ⬇ CSV Export Excel */
app.post("/export-excel", async (req, res) => {
    const rows = req.body.rows;
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Cleaned CSV");

    rows.forEach(r => sheet.addRow(r));
    
    res.setHeader("Content-Disposition", "attachment; filename=cleaned.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    await workbook.xlsx.write(res);
    res.end();
});

// Serve UI (client folder)
app.use(express.static("client"));

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Running on http://localhost:${PORT}`));
