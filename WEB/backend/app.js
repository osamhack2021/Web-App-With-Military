"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("3 2 1 Lift Off ."))
.catch((e) => console.log('MongoDB error: ', e));

const users = require("./src/routes/users");
app.use("/api/users", users);

module.exports = app;