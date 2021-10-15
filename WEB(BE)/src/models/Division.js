const mongoose = require('mongoose');

const divisionSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Division = mongoose.model('Division', divisionSchema);

module.exports = { Division };
