const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    require: true,
  },
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  posted: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
