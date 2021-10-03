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

const { User } = require('./src/models/User');
const { auth } = require('./src/middleware/auth')

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("3 2 1 Lift Off ."))
.catch((e) => console.log('MongoDB error: ', e));

app.get('/test', (req, res) => {
	res.send('Server is connected...');
});

app.post('/api/users/register', (req, res) => {
	const user = new User(req.body);
	
	user.save((err, userInfo) => {
		if(err) return res.json({ success: false, err});
		return res.status(200).json({
			success: true
		});
	});
});

app.post('/api/users/login', (req, res) => {
	User.findOne({ id: req.body.id }, (err, user) => {
		if(!user) {
			return res.json({
				loginSuccess: false,
				message: "존재하지 않는 아이디 입니다."
			});
		}
		user.comparePassword(req.body.password, (err, isMatch) => {
			if(!isMatch) {
				return res.json({
					loginSuccess: false,
					message: "비밀번호가 틀렸습니다."
				});
			}
			user.generateToken((err, user) => {
				if(err) return res.status(400).send(err);
				res.cookie("x_auth", user.token)
				.status(200)
				.json({
					loginSuccess: true, userId: user._id
				});
			});
		});
	});
});

app.get('/api/users/auth', auth, (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		isAuth: true,
		id: req.user.id,
		email: req.user.email,
		name: req.user.name,
		division: req.user.division,
		activeStudyGroupList: req.user.activeStudyGroupList
	});
});

app.get('/api/users/logout', auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id },{ token: "" }, (err, user) => {
		if(err) return res.json({ success: false, err });
		return res.status(200).send({ success: true });
	});
});

app.listen(5000, () => {
  console.log("Engine On 우주로 ~")
});