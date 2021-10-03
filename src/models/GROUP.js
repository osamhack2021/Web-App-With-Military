const mongoose = require('mongoose');

const { Schema } = mongoose;
// eslint-disable-next-line prettier/prettier
const { Types: { ObjectId } } = Schema

const GroupSchema = Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 30,
    unique: true,
    required: true,
  },
  admins: {
    type: [ObjectId],
    ref: 'Admin',
  },
  members: {
    type: [ObjectId],
    ref: 'Member',
  },
  category: {
    type: String,
  },
  score: {
    type: Number,
  },
  tags: {
    type: [ObjectId],
    ref: 'Tag',
  },
});

GroupSchema.statics.findByName = function (name) {
  return this.findOne({ name });
};

module.exports = mongoose.model('Group', GroupSchema);
