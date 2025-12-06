// ------------------------------
//  PREMIUM VERSION - DataWash-CSV™
//  CLEAN + AI-REPAIR + EXPORT EXCEL + DUPLICATES + STATS REPORT
// ------------------------------

import express from "express";
import fileUpload from "express-fileupload";
import csv from "csvtojson";
import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import { Parser as Json2csvParser } from "json2csv";
import _ from "lodash";

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve UI client
app.use(express.static(path.join(__dirname, "client")));


// ================================
// 🔥 CSV DEFAULT CLEAN ENGINE
// ================================
function normalizeWhitespace(data){
    return data.map(row=>{
        let newRow={};
        Object.keys(row).forEach(k=>{
            newRow[k]=String(row[k]||"").trim().replace(/\s+/g," ");
        });
        return newRow;
    });
}
function removeOutliers(data){
    if(data.length===0) return data;
    let numericKeys = Object.keys(data[0]).filter(key=>{
        return data.some(row => /^-?\d+(\.\d+)?$/.test(String(row[key])));
    });
    return data.filter(row=>{
        return Object.keys(row).every(key=>{
            if(!numericKeys.includes(key)) return true;
            const val = parseFloat(row[key]);
            return !(val > 999999999 || val < -999999999);
        });
    });
}
function removeDuplicates(data){
    const set = new Set();
    return data.filter(row=>{
        const key = JSON.stringify(row);
        if(set.has(key)) return false;
        set.add(key); return true;
    });
}



// ================================
// 🔥 AI-REPAIR ENGINE
// ================================
function detectType(values){
    const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phone=/^[0-9 \-\+\(\)]{8,}$/;
    let tests={num:0, date:0, email:0, phone:0, text:0};

    values.forEach(v=>{
        if(!v) return;
        if(email.test(v)) tests.email++;
        else if(phone.test(v)) tests.phone++;
        else if(!isNaN(v.replace(",",".")*1)) tests.num++;
        else if(!isNaN(Date.parse(v))) tests.date++;
        else tests.text++;
    });

    return Object.keys(tests).sort((a,b)=>tests[b]-tests[a])[0];
}
function parseDate(v){
    if(!v) return null;
    const tryDate=new Date(v);
    if(!isNaN(tryDate)) return tryDate.toISOString();
    const m=v.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if(m){
        let D=m[1].padStart(2,'0'),M=m[2].padStart(2,'0'),Y=m[3];
        if(Y.length===2) Y='20'+Y;
        return new Date(`${Y}-${M}-${D}`).toISOString();
    }
    return null;
}
function repairColumn(values,type){
    if(type==="num"){
        let nums=values.map(v=>parseFloat(v.replace(",",".")||null)).filter(n=>!isNaN(n));
        let mean=nums.reduce((a,b)=>a+b,0)/nums.length;
        return values.map(v=>isNaN(v)? mean:parseFloat(v));
    }
    if(type==="date") return values.map(v=>parseDate(v));
    if(type==="email") return values.map(v=>v?v.toLowerCase().trim():null);
    let freq={}; values.forEach(v=>{if(v) freq[v]=(freq[v]||0)+1;});
    let mode=Object.entries(freq).sort((a,b)=>b[1]-a[1])[0]?.[0]||"";
    return values.map(v=>v?v:mode);
}



// ================================
// 📌 ROUTE — Upload + Clean CSV
// ================================
app.post("/api/clean", async(req,res)=>{
    try{
        if(!req.files?.file) return res.status(400).send("Missing file");
        const tmp = "upload_"+Date.now()+".csv";
        await req.files.file.mv(tmp);

        let data = await csv().fromFile(tmp);
        let cleaned = normalizeWhitespace(data);
        cleaned = removeOutliers(cleaned);
        cleaned = removeDuplicates(cleaned);

        const out="cleaned_"+Date.now()+".csv";
        const parser=new Json2csvParser();
        fs.writeFileSync(out,parser.parse(cleaned));

        res.json({ ok:true, rows:cleaned.length, download:"/download/"+out });
    }catch(e){res.status(500).send(e.toString());}
});



// ================================
// 📌 AI-Repair CSV + Excel Export
// ================================
app.post("/api/repair", async(req,res)=>{
    try{
        if(!req.files?.file) return res.status(400).send("Missing file");
        const tmp="repair_"+Date.now()+".csv";
        await req.files.file.mv(tmp);

        const raw=await csv().fromFile(tmp);
        let header=Object.keys(raw[0]);

        // AI detect + repair per column
        let repaired=[];
        for(let col of header){
            const values=raw.map(r=>String(r[col]||""));
            let type=detectType(values);
            let rep=repairColumn(values,type);
            repaired.push({col,type,values:rep});
        }

        // rebuild rows
        let rebuilt=[];
        for(let i=0;i<raw.length;i++){
            let row={};
            repaired.forEach(c=> row[c.col]=c.values[i]);
            rebuilt.push(row);
        }

        rebuilt=removeDuplicates(rebuilt);

        // Export CSV
        const outCSV="repaired_"+Date.now()+".csv";
        fs.writeFileSync(outCSV,new Json2csvParser().parse(rebuilt));

        // Export Excel
        const outXLS="repaired_"+Date.now()+".xlsx";
        const excel=new ExcelJS.Workbook();
        const sh=excel.addWorksheet("CLEANED DATA");
        sh.addRow(header);
        rebuilt.forEach(r=> sh.addRow(header.map(h=>r[h])));
        await excel.xlsx.writeFile(outXLS);

        res.json({
            success:true,
            rows_before:raw.length,
            rows_after:rebuilt.length,
            column_types:Object.fromEntries(repaired.map(r=>[r.col,r.type])),
            download:{csv:"/download/"+outCSV, xlsx:"/download/"+outXLS},
            preview:rebuilt.slice(0,30)
        });

    }catch(e){res.status(500).json({error:e.toString()});}
});



// ================================
// 📌 Static File Downloader
// ================================
app.get("/download/:file",(req,res)=>{
    const file=req.params.file;
    if(!fs.existsSync(file)) return res.status(404).send("File missing");
    res.download(file);
});



// ================================
// 🚀 Run Server
// ================================
const PORT=process.env.PORT||10000;
app.listen(PORT,()=>console.log("🔥 DataWash-CSV API Running on →",PORT));
