const express = require('express');

const router = express.Router();
const Student = require('../models').Student;
const Teacher = require('../models').Teacher;
const {jwtVerify} = require('./middlewares');

router.get('/', async (req, res) => {
    const token = await jwtVerify(req);

    if(req.type === 'student') {
        const student = await Student.findOne({
            attributes: ['id', 'name', 'number'],
            where: {id: token.id},
        });
        if (student) {
            res.json(student)
        } else {
            res.status(404).send('404 Not Found User');
        }
    } else {
        const teacher = await Teacher.findOne({
            attributes: ['id', 'name', 'school'],
            where: {id: token.id},
        });
        if (teacher) {
            res.json(teacher);
        } else {
            res.status(404).send('404 Not Found User');
        }
    }
});

module.exports = router;
