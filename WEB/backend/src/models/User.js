const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 4,
  },
  userName: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  division: {
    type: String,
    default: null,
  },
  activeGroups: {
    type: Array,
    default: null,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  userTotalTime: {
    type: Number,
  },
  userHistory: {
    type: Array,
  },
  userTotalCount: {
    type: Number,
  },
  userMaxStreak: {
    type: Number,
  },
  userCurrentStreak: {
    type: Number,
  },
});

// DB에 저장
userSchema.pre('save', function (next) {
  const user = this;

  // 비밀번호 변경 시
  if (user.isModified('password')) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});

// 비밀번호 비교
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

// 토큰 생성
userSchema.methods.generateToken = function (cb) {
  const user = this;

  // user._id + process.env.JWT_SECRET = token
  const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET);
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    return cb(null, user);
  });
};

// 토큰 검증
userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  // 토큰 decode
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    user.findOne({ _id: decoded, token }, function (err, user) {
      if (err) return cb(err);
      return cb(null, user);
    });
  });
};

// 이메일 찾기
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
