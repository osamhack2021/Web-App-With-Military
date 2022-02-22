const mongoose = require('mongoose');

const userHistoryScehma = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  img: Buffer,
});

const UserHistory = mongoose.model('UserHistory', userHistoryScehma);

module.exports = { UserHistory };
