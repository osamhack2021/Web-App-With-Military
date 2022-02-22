const mongoose = require('mongoose');

const groupImageScehma = mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  img: Buffer,
});

const GroupImage = mongoose.model('GroupImage', groupImageScehma);

module.exports = { GroupImage };
