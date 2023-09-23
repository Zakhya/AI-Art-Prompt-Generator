const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'vectorData.js');

app.use(express.json());

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.post('/saveEmbedding', (req, res) => {
    const data = req.body;
    console.log("Received data:", data);
    // Read the existing data
    let existingData = [];
    if (fs.existsSync(DATA_FILE)) {
        existingData = require(DATA_FILE);
    }

    // Add the new embedding data
    existingData.push(data);

    // Write back to the file
    fs.writeFileSync(DATA_FILE, `module.exports = ${JSON.stringify(existingData, null, 2)};`);

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});