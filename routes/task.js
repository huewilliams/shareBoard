const express = require('express');

const router = express.Router();
const Class = require('../models').Class;
const Task = require('../models').Task;

router.get('/info/:taskId', async (req, res)=>{
    const task = await Task.findOne({
        where: {taskId: req.params.taskId}
    });

    if(task) {
        res.json(task)
    } else {
        res.status(404).send('404 Not Found');
    }
});

router.get('/download/:filename', (req, res)=>{
    const file = `./uploads/${req.params.filename}`;
    res.download(file);
});

router.get('/:className', async (req, res)=>{
    const task = await Task.findAll({
        where: { className: req.params.className },
    });

    if(task) {
        res.json(task);
    }
});

router.post('/', async (req, res)=>{
    const classExist = await Class.findOne({
        where: {name: req.body.className}
    });

    if (classExist) {
        const task = await Task.create({
            taskName: req.body.taskName,
            taskEndLine: parseDate(req.body.taskEndLine),
            taskInfo: req.body.taskInfo,
            file: req.body.file,
            className: req.body.className,
        });

        if(task) {
            res.json(task)
        }
    } else {
        res.status(404).send('404 Not Found ClassName');
    }
});

function parseDate(date) {
    let y = date.substr(0,4),
        m = date.substr(5,2) - 1,
        d = date.substr(8,2);
    return new Date(y,m,d);
}

module.exports = router;
