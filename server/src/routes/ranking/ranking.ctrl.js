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

  // 유저 랭킹 업데이트
  userUpdate: async (req, res) => {
    const users = await User.find();
    for (let i = 0; i < users.length; i += 1) {
      const rank = await User.find({
        totalTime: { $gt: users[i].totalTime },
      }).count();
      let tier = '언랭크';
      if (users[i].totalTime > 1800) {
        if (rank < 1) {
          tier = '그랜드마스터';
        } else if (rank < 4) {
          tier = '마스터';
        } else if (rank < 10) {
          tier = '다이아몬드';
        } else if (rank < 30) {
          tier = '플래티넘';
        } else if (rank < 70) {
          tier = '골드';
        } else {
          tier = '실버';
        }
      }
      await User.findOneAndUpdate(
        { _id: users[i]._id },
        {
          $set: {
            rank: rank + 1,
            tier,
          },
        },
      );
    }
    return res.status(200).json({ success: true });
  },

  // 그룹 랭킹 업데이트
  groupUpdate: async (req, res) => {
    const groups = await Group.find();
    for (let i = 0; i < groups.length; i += 1) {
      const rank = await Group.find({
        totalTime: { $gt: groups[i].totalTime },
      }).count();
      let tier = '언랭크';
      if (groups[i].totalTime > 1800) {
        if (rank < 1) {
          tier = '그랜드마스터';
        } else if (rank < 4) {
          tier = '마스터';
        } else if (rank < 10) {
          tier = '다이아몬드';
        } else if (rank < 30) {
          tier = '플래티넘';
        } else if (rank < 70) {
          tier = '골드';
        } else {
          tier = '실버';
        }
      }
      await Group.findOneAndUpdate(
        { _id: groups[i]._id },
        {
          $set: {
            rank: rank + 1,
            tier,
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
