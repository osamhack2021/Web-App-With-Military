const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  // 이메일
  email: {
    type: String,
    unique: true,
    required: true,
  },
  // 비밀번호
  password: {
    type: String,
    minlength: 4,
  },
  // 이름
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    unique: true,
    index: true,
    required: true,
  },
  // 소개
  info: {
    type: String,
    default: null,
  },
  // 생성일
  created: {
    type: Date,
  },
  // 가입한 그룹 리스트
  groupList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
  // 전체 활동 시간
  totalTime: {
    type: Number,
    default: 0,
  },
  // 활동 기록
  history: [
    {
      type: Object,
    },
  ],
  // 최대 연속 일 수
  maxStreak: {
    type: Number,
    default: 0,
  },
  // 현재 연속 일 수
  curStreak: {
    type: Number,
    default: 0,
  },
  // 타이머 : 활동 시작 시간
  startTime: {
    type: Date,
  },
  // 타이머 : 타이머 정지한 시간
  pauseTime: {
    type: Number,
  },
  // 현재 자기개발 중인 그룹
  activeGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  // 현재 자기개발 중인 카테고리
  activeCategory: {
    type: String,
  },
  // 유저 랭킹
  rank: {
    type: Number,
  },
  // 티어
  tier: {
    type: String,
    default: '언랭크',
  },
  // 전역일
  dischargeDate: {
    type: Date,
  },
  // 프로필 사진
  /*
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserImage',
  },
  */
  image: {
    type: String,
  },
  // 배경 사진
  background: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserBackground',
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: String,
  },
});

// DB에 저장
userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    // console.log('password changed')
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호 비교
userSchema.methods.comparePassword = async function (plainPassword, cb) {
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
    user
      .findOne({ _id: decoded, token })
      .populate('groupList')
      .populate('activeGroup')
      .exec((err, user) => {
        if (err) return cb(err);
        return cb(null, user);
      });
  });
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
