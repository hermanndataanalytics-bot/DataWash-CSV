const express = require("express");
const fileUpload = require("express-fileupload");
const csv = require("csvtojson");
const path = require("path");

const app = express();

// 🔥 Serve client UI folder
app.use(express.static(path.join(__dirname, "client")));
app.use(fileUpload());
app.use(express.json());

// 🔥 Route homepage UI
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/index.html"));
});

app.post("/clean", async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: "No CSV uploaded" });
    }

    const file = req.files.file.data.toString("utf8");
    const json = await csv().fromString(file);

    res.json({
        message: "CSV Processed Successfully",
        rows: json.length,
        sample: json.slice(0,10) // preview results only 10 rows
    });
});

// PORT for Render
app.listen(10000, () => console.log("🚀 DataWash CSV Live @ PORT 10000"));
