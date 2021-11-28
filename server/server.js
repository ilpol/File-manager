const express = require('express');
const path = require('path');

// local stub server

const app = express();
    
    app.use(express.static('public'));
    app.get('/api/', (req, res) => {
        res.sendFile(path.resolve(__dirname, `./data/content.json`));
        
    });

const port = 5000;

app.listen(port, () => console.log(`Serverr started on port ${port}`));


