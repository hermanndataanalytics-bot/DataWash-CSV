import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import csv from "csvtojson";
import { fileURLToPath } from "url";
import ExcelJS from "exceljs";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "client")));

// Upload CSV
const upload = multer({ dest: "uploads/" });

// 🟢 HOME UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/index.html"));
});

// 🟢 CSV CLEAN ENDPOINT
app.post("/api/clean", upload.single("file"), async (req,res) => {
  const filePath = req.file.path;
  const raw = await csv().fromFile(filePath);

  let cleaned = normalizeWhiteSpace(raw);
  cleaned = removeDuplicates(cleaned);
  cleaned = removeOutliers(cleaned);

  const output = await exportToExcel(cleaned);
  res.download(output, "DataWash-Cleaned.xlsx");
});

// Render use port $PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("CSV API running:", PORT));
function removeDuplicates(data) {
  const seen = new Set();
  return data.filter(row => {
    const key = JSON.stringify(row);
    return seen.has(key) ? false : seen.add(key);
  });
}

function removeOutliers(data, threshold = 3) {
  const numericCols = Object.keys(data[0]).filter(k => !isNaN(data[0][k]));

  return data.filter(row => {
    for (let col of numericCols) {
      const values = data.map(r => parseFloat(r[col])).filter(n => !isNaN(n));
      const mean = values.reduce((a,b)=>a+b)/values.length;
      const sd = Math.sqrt(values.reduce((a,b)=>a+(b-mean)**2,0)/values.length);

      if (Math.abs(row[col] - mean) > threshold*sd) return false;
    }
    return true;
  });
}

function normalizeWhiteSpace(data) {
  return data.map(row =>
    Object.fromEntries(
      Object.entries(row).map(([k,v]) => [k, String(v).trim().replace(/\s+/g," ")])
    )
  );
}
import ExcelJS from "exceljs";

async function exportXLSX(data){
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Cleaned Data");
  sheet.addRows([Object.keys(data[0]), ...data.map(o=>Object.values(o))]);

  const filename = "cleaned.xlsx";
  await workbook.xlsx.writeFile(filename);
  return filename;
}
async function exportToExcel(data, outputPath = "cleaned_output.xlsx") {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Cleaned CSV");

  sheet.addRow(Object.keys(data[0])); // headers
  data.forEach(row => sheet.addRow(Object.values(row)));

  await workbook.xlsx.writeFile(outputPath);
  return outputPath;
}
app.post("/api/stats", upload.single("file"), async (req,res)=>{
  const data = await csv().fromFile(req.file.path);

  const total = data.length;
  const unique = removeDuplicates(data).length;
  const duplicates = total - unique;
  const empty = data.filter(r => Object.values(r).every(v=>v==="")).length;

  res.json({
    rows_total: total,
    duplicates,
    empty_rows: empty,
    quality_score: Math.round(100 * (unique-empty) / total)
  });
});
