const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  tagName: {
    type: String,
    unique: true,
  },
  groupList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = { Tag };
