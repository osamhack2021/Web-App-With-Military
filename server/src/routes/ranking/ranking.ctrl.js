const { User } = require('../../models/User/User');
const { Group } = require('../../models/Group/Group');

const get = {
  // 전체 유저 랭킹
  user: async (req, res) => {
    const result = await User.find().sort({ totalTime: -1 });
    return res.status(200).json({ success: true, result });
  },

  // 전체 그룹 랭킹
  group: async (req, res) => {
    const result = await Group.find().sort({ totalTime: -1 });
    return res.status(200).json({ success: true, result });
  },

  update: async (req, res) => {
    const users = await User.find();
    for (let i = 0; i < users.length; i += 1) {
      let rank = await User.find({
        totalTime: { $gt: users[i].totalTime },
      }).count();
      await User.findOneAndUpdate(
        { _id: users[i]._id },
        {
          $set: {
            rank: rank + 1,
          },
        },
      );
    }
    return res.status(200).json({ success: true });
  },
};

module.exports = {
  get,
};
