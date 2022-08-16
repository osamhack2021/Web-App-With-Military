const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  // 제목
  title: {
    type: String,
    require: true,
  },
  // 활동 시간
  elapsedTime: {
    type: Number,
    default: null,
  },
  // 작성자 ID
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // 그룹 ID
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  // 작성 날짜
  posted: {
    type: Date,
  },
  // 내용
  content: {
    type: String,
    require: true,
  },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board };
