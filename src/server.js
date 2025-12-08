import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// Famaritana ny __dirname ho an'ny ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ZAVA-DEHIBE 1: Manondro ny 'dist' ho toy ny lahatahiry static file
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath)); // Express dia tokony hikarakara ny MIME type marina

// ZAVA-DEHIBE 2: Manomboka amin'ny URL rehetra, dia alefa any amin'ny index.html ao anaty dist
app.get('*', (req, res) => {
    // Tsy maintsy atao antoka fa misy ilay index.html ao anaty dist
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});