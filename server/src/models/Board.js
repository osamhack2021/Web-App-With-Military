const mongoose = require('mongoose');

function seoul() {
  const temp = new Date();
  temp.setHours(temp.getHours() + 9);
  return temp;
}

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
    default: seoul(),
  },
  content: {
    type: String,
    require: true,
  },
});

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board };
