const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    require: true,
  },
  posted: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
