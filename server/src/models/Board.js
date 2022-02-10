const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  elapsedTime: {
    type: Number,
    default: null,
  },
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  posted: {
    type: Date,
  },
  content: {
    type: String,
    require: true,
  },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board };
