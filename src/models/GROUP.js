const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
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

groupSchema.pre('save', function (next) {
  next();
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = { Group, GroupSchema };
