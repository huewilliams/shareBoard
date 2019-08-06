const express = require('express');

const router = express.Router();
const Student = require('../models').Student;
const {jwtVerify} = require('./middlewares');

router.get('/student', async (req, res) => {
    const token = await jwtVerify(req);

    const student = await Student.findOne({
        attributes: ['id', 'name', 'number'],
        where: {id: token.id},
    });
    if (student) {
        res.json(student)
    } else {
        res.status(404).send('404 Not Found User');
    }
});

module.exports = router;
