const express = require('express'),
   app = express();

const bodyParser = require('body-parser');
const db = require('./db'),
    TaskRoute = require('./Controllers/TaskController')

app.use(bodyParser.json())
app.use('/api/Task', TaskRoute)
app.use(bodyParser.urlencoded({ extended: false }));


db.query("SELECT 1")
    .then(() => {
        console.log("db connection succeeded.");
        app.listen(3000, () => {
            console.log('Server started at 3000');
        });
    })
    .catch(err => console.log('db connection failed. \n' + err));
