const express = require('express');
const app = express();
const db = require("./src/db/db");
const etudiantroute = require('./src/Controllers/EtudiantController');
const umiroute = require('./src/Controllers/umiController');


app.use(express.json());


app.use('/inscription', etudiantroute);
app.use('/umi', umiroute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});