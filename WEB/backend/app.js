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
  .then(() => console.log('(DB 연결 성공) 3 2 1 Lift Off .'))
  .catch(e => console.log('MongoDB error: ', e));

const users = require('./src/routes/users');
const groups = require('./src/routes/groups');
const ranks = require('./src/routes/ranks');

app.use('/users', users);
app.use('/groups', groups);
app.use('/ranks', ranks);

module.exports = app;
