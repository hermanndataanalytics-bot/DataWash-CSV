import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import csv from "csvtojson";
import { fileURLToPath } from "url";

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
app.post("/api/clean", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const jsonData = await csv().fromFile(filePath);

    // CLEANING LOGIC basic: remove empty rows
    const cleaned = jsonData.filter(row =>
      Object.values(row).some(v => v.trim() !== "")
    );

    const output = "cleaned.csv";
    fs.writeFileSync(output, cleaned.map(r => Object.values(r).join(",")).join("\n"));

    res.download(output, "cleaned_file.csv");
  } catch (err) {
    res.status(500).send("Error cleaning file");
  }
});

// Render use port $PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("CSV API running:", PORT));
