const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({path: '.env'});

const sequelize = require('./models').sequelize;
const classRouter = require('./routes/class');
const taskRouter = require('./routes/task');
const authRouter = require('./routes/auth');
const docsRouter = require('./routes/document');
const userRouter = require('./routes/user');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
sequelize.sync();

app.set('port', 5000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/class', classRouter);
app.use('/task', taskRouter);
app.use('/auth', authRouter);
app.use('/docs', docsRouter);
app.use('/user', userRouter);

server.listen(app.get('port'), ()=> {
    console.log(`server listening on ${app.get('port')}`)
});

io.on('connection', (socket) => {
    socket.on('data', (data)=>{
        console.log(data);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected: ' + socket.name);
    });
});
