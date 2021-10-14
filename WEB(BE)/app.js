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

const users = require('./src/routes/users');
const groups = require('./src/routes/groups');
const ranking = require('./src/routes/ranking');
const studying = require('./src/routes/studying');
const tags = require('./src/routes/tags');
const board = require('./src/routes/board');
const search = require('./src/routes/search');

app.use('/users', users);
app.use('/groups', groups);
app.use('/ranking', ranking);
app.use('/studying', studying);
app.use('/tags', tags);
app.use('/board', board);
app.use('/search', search);

module.exports = app;
