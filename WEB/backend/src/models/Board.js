const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
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
    default: Date.now,
  },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board };
