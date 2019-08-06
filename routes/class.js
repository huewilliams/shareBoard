const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const Class = require('../models').Class;
const Student = require('../models').Student;
const { jwtVerify } = require('./middlewares');

router.get('/:id', async (req, res)=> {
    const student = await Student.findOne({
        where: {id: req.params.id},
    });
    if(student) {
        res.json(await student.getClasses());
    }
});

router.post('/join/:className', async (req, res)=>{
    const student = await jwtVerify(req);
    const studentData = await Student.findOne({
        where: {id: student.id}
    });
    const classData = await Class.findOne({
        where: { name: req.params.className }
    });
    if(classData) {
        studentData.setClasses(classData);
        res.status(200).send('join success');
    }
});

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

fs.readdir('uploads', (error)=>{
    if (error) {
        console.error('uploads 폴더가 없어 uploads 폴더를 서버의 디스크에 생성합니다');
        fs.mkdirSync('uploads');
    }
});

let upload = multer({
    storage: multer.diskStorage({
        // 파일 저장 경로 설정
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname));
        }
        ,
        // 파일 사이즈 제한 설정
        limits: {fileSize: 5 * 1024 * 1024}
    })
});

router.post('/img', upload.single('img'), async (req, res)=>{
   res.json({ img: req.file.filename });
});

module.exports = router;
