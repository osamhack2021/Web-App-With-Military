const mongoose = require('mongoose');

function seoul() {
  const temp = new Date();
  temp.setHours(temp.getHours() + 9);
  return temp;
}

const groupSchema = mongoose.Schema({
  groupName: {
    type: String,
    minlength: 4,
    maxlength: 30,
    unique: true,
    require: true,
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
  // 가입 승인 대기
  waiting: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  category: {
    type: String,
    require: true,
  },
  tags: {
    type: Array,
  },
  totalTime: {
    type: Number,
    default: 0,
  },
  // 그룹 소개
  info: {
    type: String,
    default: null,
  },
  rank: {
    type: Number,
  },
  created: {
    type: Date,
    default: seoul(),
  },
});

groupSchema.statics.findByName = function (groupName) {
  return this.findOne({ groupName });
};

const Group = mongoose.model('Group', groupSchema);

module.exports = { Group };
