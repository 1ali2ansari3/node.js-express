const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./db");

app.use(cors({
    origin: ['http://localhost:3000','http://localhost:8080','http://localhost:4200']
}));

app.use(express.json());



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});