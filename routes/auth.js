const express = require('express');

const router = express.Router();
const Student = require('../models').Student;
const Teacher = require('../models').Teacher;
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
   } else {
       const teacher = await Teacher.findOne({
           where: {id: req.body.id, password: req.body.password}
       });

       if(teacher) {
           let type = 'teacher';
           const token = newJwt(teacher, type);

           res.json({
               token: token,
               type: type,
               id: teacher.id,
           });
       } else {
           res.status(401).send('401 Auth Failed');
       }
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

router.post('/signUp/teacher', async (req, res)=>{
    const user = await Teacher.findOne({
        where: {id: req.body.id},
    });

    if(user) {
        res.status(409).send('409 Duplicate Teacher Id');
    } else {
        const teacher = await Teacher.create({
            id: req.body.id,
            name: req.body.name,
            password: req.body.password,
            school: req.body.school,
        });

        if(teacher) {
            res.status(201).json(teacher);
        }
    }
});

module.exports = router;
