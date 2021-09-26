const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('(DB 연결 성공) 3 2 1 Lift Off .'))
  .catch(e => console.log('MongoDB error: ', e));

const users = require('./src/routes/users');
const groups = require('./src/routes/groups');

app.use('/api/users', users);
app.use('/api/groups', groups);

module.exports = app;
