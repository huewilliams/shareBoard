const express = require('express');

const router = express.Router();
const Student = require('../models').Student;
const { newJwt } = require('./middlewares');

router.post('/signIn', async (req, res)=>{
   const student = await Student.findOne({
       where: {id: req.body.id, password: req.body.password}
   });

   if(student) {
        let type = 'student';
        const token = newJwt(student, type);

        res.json({
            token: token,
            type: type,
            id: student.id,
        });
   }
});

router.post('/signUp/student', async (req, res)=>{
    const user = await Student.findOne({
        where: {id: req.body.id},
    });

    if(user) {
        res.status(409).send('409 Duplicate Student Id')
    } else {
       const student = await Student.create({
           id: req.body.id,
           name: req.body.name,
           password: req.body.password,
           number: req.body.number,
       });

        if(student) {
            res.status(201).json(student);
        }
    }
});

module.exports = router;
