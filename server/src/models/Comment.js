const mongoose = require('mongoose');

function seoul() {
  const temp = new Date();
  temp.setHours(temp.getHours() + 9);
  return temp;
}

const commentSchema = mongoose.Schema({
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
  },
  content: {
    type: String,
    require: true,
  },
  posted: {
    type: Date,
    default: seoul(),
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
