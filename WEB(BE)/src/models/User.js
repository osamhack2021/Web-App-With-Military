const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 4,
  },
  userName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    unique: true,
    index: true,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  division: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Division',
    },
  ],
  groupList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
  totalTime: {
    type: Number,
    default: 0,
  },
  history: [
    {
      type: Object,
    },
  ],
  maxStreak: {
    type: Number,
  },
  currentStreak: {
    type: Number,
  },
  startTime: {
    type: Date,
  },
  pauseTime: {
    type: Number,
  },
  activeGroup: {
    type: String,
  },
  activeCategory: {
    type: String,
  },
  token: {
    type: String,
  },
  rank: {
    type: Number,
  },
});

// DB에 저장
userSchema.pre('save', function (next) {
  const user = this;

  // 비밀번호 변경 시
  if (user.isModified('password')) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
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

// 비밀번호와 토큰을 제외한 유저정보 전송
userSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.password;
  delete data.token;
  return data;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
