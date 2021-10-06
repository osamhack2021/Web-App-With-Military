const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: {
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
});

groupSchema.statics.findByGroupName = function (name) {
  return this.findOne({ name });
};

const Group = mongoose.model('Group', groupSchema);

module.exports = { Group };
