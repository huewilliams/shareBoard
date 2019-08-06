const express = require('express');

const router = express.Router();
const Class = require('../models').Class;

router.post('/', async (req, res)=> {
    let data = await Class.create({
        name: req.body.className,
        info: req.body.info,
        img: req.body.img,
    });
    if(data) {
        res.json(data)
    }
});

module.exports = router;
