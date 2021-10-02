const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  groupName: {
    type: String,
    minlength: 4,
    maxlength: 30,
    unique: 1,
  },
  members: {
    type: Array,
  },
  category: {
    type: String,
  },
  score: {
    type: Number,
  },
  tags: {
    type: Array,
  },
});

groupSchema.statics.findByGroupName = function (groupName) {
  return this.findOne({ groupName });
};

const Group = mongoose.model('Group', groupSchema);

module.exports = { Group };
