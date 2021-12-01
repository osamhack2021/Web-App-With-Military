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
const board = require('./src/routes/board');
const search = require('./src/routes/search');

app.use('/api/users', users);
app.use('/api/groups', groups);
app.use('/api/ranking', ranking);
app.use('/api/studying', studying);
app.use('/api/board', board);
app.use('/api/search', search);

module.exports = app;
