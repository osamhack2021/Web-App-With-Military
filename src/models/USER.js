const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const { Schema } = mongoose;
// eslint-disable-next-line prettier/prettier
const { Types: { ObjectId } } = Schema

const UserSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    minlength: 4,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  division: {
    type: ObjectId,
    ref: 'Division',
  },
  groupList: {
    type: [ObjectId],
    ref: 'Group',
  },
  totalTime: {
    type: Number,
  },
  posts: {
    type: [ObjectId],
    ref: 'Post',
  },
  totalCount: {
    type: Number,
  },
  maxStreak: {
    type: Number,
  },
  currentStreak: {
    type: Number,
  },
  startTime: {
    type: Date,
  },
});

// 계정 생성 또는 비밀번호 변경시 비밀번호 암호화 및 설정 method
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, saltRounds); // 비밀번호 암호화
  this.hashedPassword = hash;
};

// 로그인시 비밀번호 확인 메서드
UserSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

// hashedPassword를 제외한 유저정보 전송
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

// 토큰 생성
UserSchema.methods.generateToken = function () {
  // _id와 name 값이 들어간 토큰 심기
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '20m',
    },
  );
  return token;
};

// 로그인 및 계정 생성시 아이디 조회
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

UserSchema.statics.findById = function (_id) {
  return this.findOne({ _id });
};

module.exports = mongoose.model('User', UserSchema);
