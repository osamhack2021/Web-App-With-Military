const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  categoryName: {
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

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category };
