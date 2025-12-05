const express = require("express");
const path = require("path");
const app = express();

// ===== FRONTEND (UI) =====
app.use(express.static(path.join(__dirname, "client")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/index.html"));
});

// ===== BACKEND API ENDPOINTS =====
app.use(express.json());

app.post("/api/clean", (req, res) => {
    res.json({ message: "CSV Processed Successfully" });
});

// === PORT Render ===
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
