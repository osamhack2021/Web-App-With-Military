const mongoose = require('mongoose');

const userImageScehma = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  img: Buffer,
});

const UserImage = mongoose.model('UserImage', userImageScehma);

module.exports = { UserImage };
