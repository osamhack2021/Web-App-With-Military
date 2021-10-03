"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
	id: {
		type: String,
		minlength: 4,
		maxlength: 30,
		unique: 1
	},
	email: {
		type: String,
		trim: true,
		unique: 1
	},
	password: {
		type: String,
		minlength: 4,
	},
	name: {
		type: String,
		minlength: 2,
		maxlength: 30
	},
	division: {
		type: String,
		default: null
	},
	activeStudyGroupList: {
		type: String,
		default: null
	},
	token: {
		type: String
	},
	tokenExp: {
		type: Number
	}
});

userSchema.pre('save', function( next ) {
	var user = this;
	
	if(user.isModified('password')) {
		bcrypt.genSalt(saltRounds, function(err, salt) {
			if(err) return next(err);
			bcrypt.hash(user.password, salt, function(err, hash) {
				if(err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
	bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
}

userSchema.methods.generateToken = function(cb) {
	var user = this;
	
	var token = jwt.sign(user._id.toHexString(), 'wimilToken');
	user.token = token;
	user.save(function(err, user) {
		if(err) return cb(err);
		cb(null, user);
	});
}

userSchema.statics.findByToken = function(token, cb) {
	var user = this;
	
	jwt.verify(token, 'wimilToken', function(err, decoded) {
		user.findOne({"_id": decoded, "token": token }, function(err, user) {
			if(err) return cb(err);
			cb(null, user);
		});
	});
}

const User = mongoose.model('User', userSchema);

module.exports = { User };