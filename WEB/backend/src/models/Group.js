const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  groupName: {
    type: String,
    minlength: 4,
    maxlength: 30,
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  tags: {
    type: Array,
  },
  category: {
    type: String,
  },
  totalTime: {
    type: Number,
    default: 0,
  },
});

groupSchema.statics.findByName = function (groupName) {
  return this.findOne({ groupName });
};

const Group = mongoose.model('Group', groupSchema);

module.exports = { Group };
