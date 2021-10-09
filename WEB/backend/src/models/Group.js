const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 30,
    unique: true,
    required: true,
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
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],
  category: {
    type: String,
  },
  score: {
    type: Number,
  },
});

// groupSchema.statics.findByName = function (name) {
//   return this.findOne({ name });
// };

const Group = mongoose.model('Group', groupSchema);

module.exports = { Group };
