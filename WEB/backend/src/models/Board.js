const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  writer: {
    type: String,
    require: true,
  },
  groupName: {
    type: String,
    default: null,
  },
  posted: {
    type: Date,
    default: Date.now,
  },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board };
