const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const path = require('path');
const service = require('../Service/TaskService')

router.get('/', async (req, res) => {
    try {
        const tasks = await service.getAllTask();
        const ejsFilePath = path.join(__dirname, '../template/task.html');

        ejs.renderFile(ejsFilePath, { databaseData: tasks }, (err, html) => {
            if (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } else {
                res.send(html);
            }
        });

        
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const taskId = req.params.id; 
        const task = await service.getTaskId(taskId); 

        const ejsFilePath = path.join(__dirname, '../template/task.html');

        ejs.renderFile(ejsFilePath, { databaseData: task }, (err, html) => {
            if (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } else {
                res.send(html);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});



router.delete('/:id', async (req, res) => {
    const taskId = req.params.id;
    const del = await service.deleteTask(taskId);
    
    if (del === 0) {
        res.status(404).json('Aucun enregistrement avec l\'identifiant donné : ' + taskId);
    } else {
        
        res.redirect('/'); 
    }
});


router.post('/', async (req, res) => {
    const a = await service.add0rEditTask(req.body)
    res.status(201).send('created successfully.')
})


module.exports = router;
