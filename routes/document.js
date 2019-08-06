const express = require('express');

const router = express.Router();
const Document = require('../models').Document;
const { jwtVerify } = require('./middlewares');

router.get('/:taskId', async (req, res)=>{
    const author = await jwtVerify(req);
    let document = await Document.findOne({
        where: { author: author.id, task: req.params.taskId }
    });
    if(document) {
        res.json(document);
    } else {
        const result = await Document.create({
            author: author.id,
            task: req.params.taskId,
        });
        if(result) res.json(result)
    }
});

router.patch('/:taskId', async (req, res)=>{
    const author = await jwtVerify(req);
    let document = await Document.findOne({
        where: { author: author.id, task: req.params.taskId }
    });
    if(document) {
        const result = await Document.update({
            content: req.body.content,
        },{
            where: { author: document.author, task: document.task}
        });
        if(result) res.status(200).send('Docs Update Success')
    } else {
        res.staus(404).send('404 Not Found Document');
    }
});

module.exports = router;
