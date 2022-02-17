const mongoose = require('mongoose');

const backgroundScehma = mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  img: Buffer,
});

const Background = mongoose.model('Backgrounds', backgroundScehma);

module.exports = { Background };
