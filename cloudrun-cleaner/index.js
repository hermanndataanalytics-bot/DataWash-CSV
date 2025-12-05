const express = require("express");
const cors = require("cors");
const { parse } = require("csv-parse/sync");

const app = express();
app.use(express.text()); // CSV RAW input
app.use(cors());

// ===========================
// 🚀 CSV CLEAN API
// ===========================
app.post("/cleanCSV", (req, res) => {
    try {
        if (!req.body || typeof req.body !== "string") {
            return res.status(400).send("⚠ Send CSV raw text.");
        }

        const rows = parse(req.body, { skip_empty_lines: true });
        const header = rows[0];
        const data = rows.slice(1);

        const unique = Array.from(new Set(data.map(r => JSON.stringify(r))))
            .map(r => JSON.parse(r));

        const cleaned = unique.map(row =>
            row.map(c => c.trim() === "" ? "(empty)" : c)
        );

        res.json({
            columns: header.length,
            rows_before: data.length,
            rows_after: cleaned.length,
            sample: cleaned.slice(0, 10),
            cleaned_data: cleaned
        });

    } catch (e) {
        res.status(500).send("❌ Parse failed → " + e);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("🔥 CSV API running:", PORT));
