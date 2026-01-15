const express = require('express');
const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
    res.send('Welcome to the Knitting API!');
});

app.listen(PORT, () => {
    console.log
    (`Server running on http://localhost:${PORT}`);
});