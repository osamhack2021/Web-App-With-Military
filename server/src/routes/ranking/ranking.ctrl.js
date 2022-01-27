const { User } = require('../../models/User');
const { Group } = require('../../models/Group');

const get = {
  // 전체 유저 랭킹
  user: async (req, res) => {
	  const result = await User.find().sort({totalTime: -1});
    return res.status(200).json({ success: true, result});
  },

  // 전체 그룹 랭킹
  group: async (req, res) => {
	  const result = await Group.find().sort({totalTime: -1});
    return res.status(200).json({ success: true, result});
  },
};

module.exports = {
  get,
};
