const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB 연결 성공'))
  .catch(e => console.log('MongoDB error: ', e));

const http = require('http');
const users = require('./src/routes/users');
const groups = require('./src/routes/groups');
const ranking = require('./src/routes/ranking');
const timer = require('./src/routes/timer');
const board = require('./src/routes/board');
const comment = require('./src/routes/comment');
const search = require('./src/routes/search');

app.use('/api/users', users);
app.use('/api/groups', groups);
app.use('/api/ranking', ranking);
app.use('/api/timer', timer);
app.use('/api/board', board);
app.use('/api/comment', comment);
app.use('/api/search', search);

// 6시간 마다 ranking 업데이트
setInterval(function () {
  http.get('http://localhost:5000/api/ranking/user/update');
  http.get('http://localhost:5000/api/ranking/group/update');
}, 21600000);

module.exports = app;
