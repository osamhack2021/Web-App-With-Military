const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = { Tag };
