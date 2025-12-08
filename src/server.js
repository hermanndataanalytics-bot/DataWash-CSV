import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// Mampiasa ny port omen'ny Render na 3000 raha mampiasa eo an-toerana
const port = process.env.PORT || 3000;

// Fomba fiasa ho an'ny ES Modules (Node.js) hahitana ny __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Manondro ny lahatahiry 'dist' (izay misy ny kaody React namboarina)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// 2. Raha misy fiangaviana hafa tonga, dia averina any amin'ny index.html hatrany (ho an'ny SPA - Single Page Application)
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// 3. Manomboka mihaino ny port
app.listen(port, () => {
    console.log(`Server running and serving static files from: ${distPath}`);
    console.log(`Application available at port ${port}`);
});