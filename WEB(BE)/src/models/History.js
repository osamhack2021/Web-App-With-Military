const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
  history: [
    {
      type: Object,
    },
  ],
});

const History = mongoose.model('History', historySchema);

module.exports = { History };
