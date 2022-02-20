const mongoose = require('mongoose');

const userBackgroundScehma = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  img: Buffer,
});

const UserBackground = mongoose.model('UserBackground', userBackgroundScehma);

module.exports = { UserBackground };
