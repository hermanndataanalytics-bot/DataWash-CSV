const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.use(express.text({ type: "*/*" })); // Receives raw CSV

// ------------ CSV CLEAN API (FREE) ------------
app.post("/clean", (req, res) => {
  const raw = req.body;

  if (!raw || typeof raw !== "string") {
    return res.status(400).send("CSV text required in request body");
  }

  const cleaned = raw.split("\n")
    .map(r => r.split(",")
      .map(c => c.trim() === "" ? "(empty)" : c.trim()));

  res.json({
    status: "success",
    rows: cleaned.length,
    columns: cleaned[0]?.length || 0,
    cleaned
  });
});

// Export HTTP Function V1 FREE
exports.api = functions.https.onRequest(app);
