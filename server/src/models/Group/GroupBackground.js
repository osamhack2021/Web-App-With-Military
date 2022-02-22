const mongoose = require('mongoose');

const groupBackgroundScehma = mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  img: Buffer,
});

const GroupBackground = mongoose.model(
  'GroupBackground',
  groupBackgroundScehma,
);

module.exports = { GroupBackground };
