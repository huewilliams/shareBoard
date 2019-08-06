const express = require('express');
const cors = require('cors');
require('dotenv').config({path: '.env'});

const sequelize = require('./models').sequelize;
const classRouter = require('./routes/class');
const taskRouter = require('./routes/task');
const authRouter = require('./routes/auth');

const app = express();
sequelize.sync();

app.set('port', 5000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '50mb'}));

app.use('/class', classRouter);
app.use('/task', taskRouter);
app.use('/auth', authRouter);

app.listen(app.get('port'), ()=> {
    console.log(`server listening on ${app.get('port')}`)
});
