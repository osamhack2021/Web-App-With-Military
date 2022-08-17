const mongoose = require('mongoose');

function seoul() {
  const temp = new Date();
  temp.setHours(temp.getHours() + 9);
  return temp;
}

const commentSchema = mongoose.Schema({
  // 작성자 ID
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // 게시글 ID
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
  },
  // 내용
  content: {
    type: String,
    require: true,
  },
  // 작성 날짜
  posted: {
    type: Date,
    default: seoul(),
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
