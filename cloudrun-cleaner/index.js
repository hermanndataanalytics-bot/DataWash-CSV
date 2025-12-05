// ------------------------------
// import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import ExcelJS from "exceljs";
import path from "path";

const app = express();
const upload = multer({ dest: "uploads/" });

function cleanRow(row){
    let r = {};
    for(let k in row){
        let v = row[k].trim();
        r[k] = v === "" ? null : v;
    }
    return r;
}
function removeEmpty(data){ return data.filter(r=>Object.values(r).some(v=>v)); }
function removeDuplicates(data){
    const seen = new Set();
    return data.filter(r=>{
        const key = JSON.stringify(r);
        if(seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

//======================== API CLEAN CSV ========================
app.post("/clean", upload.single("file"), async(req,res)=>{
    let raw = [];
    fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", r=> raw.push(cleanRow(r)))
    .on("end", async()=>{

        const total = raw.length;
        const noEmpty = removeEmpty(raw);
        const cleaned = removeDuplicates(noEmpty);
        const empty = total - noEmpty.length;
        const duplicates = noEmpty.length - cleaned.length;
        const quality = Math.round(((total - empty - duplicates)/ total)*100);

        //Export to Excel
        let token = Date.now()+".xlsx";
        const filePath = "exports/"+token;
        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet("CleanedData");
        ws.columns = Object.keys(cleaned[0]).map(h=>({ header:h, key:h }));
        cleaned.forEach(r=>ws.addRow(r));
        await wb.xlsx.writeFile(filePath);

        res.json({
            stats: { total, cleaned: cleaned.length, empty, duplicates, quality },
            preview: cleaned.slice(0,20),
            file: token
        });
    })
});

//======================== DOWNLOAD ========================
app.get("/download/:token",(req,res)=>{
    res.download("exports/"+req.params.token);
});

//======================== CLIENT UI ========================
app.use(express.static("client"));

//======================== START ============================
app.listen(3000,()=>console.log("🚀 Server running :3000"));
