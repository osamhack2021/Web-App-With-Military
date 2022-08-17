const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  // 그룹 이름
  groupName: {
    type: String,
    minlength: 4,
    maxlength: 30,
    unique: true,
    require: true,
  },
  // 그룹 어드민
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // 그룹 멤버
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // 가입 승인 대기 리스트
  waiting: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // 활동중인 그룹 멤버
  activeUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // 그룹 카테고리
  category: {
    type: String,
    require: true,
  },
  // 그룹 전체 활동 시간
  totalTime: {
    type: Number,
    default: 0,
  },
  // 그룹 소개
  info: {
    type: String,
    default: null,
  },
  // 그룹 랭킹
  rank: {
    type: Number,
  },
  // 티어
  tier: {
    type: String,
    default: '언랭크',
  },
  // 생성일
  created: {
    type: Date,
  },
  // 그룹 프로필 사진
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupImage',
  },
  // 그룹 배경 사진
  background: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupBackground',
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = { Group };
