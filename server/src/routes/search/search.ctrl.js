const { Group } = require('../../models/Group');
const { User } = require('../../models/User');

const post = {
  // 그룹 검색
  all: async (req, res) => {
    try {
      if (req.body.search === '')
        return res
          .status(200)
          .json({ success: true, group: [], users: [] });
      const Groups = await Group.find({
        // 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾음
        groupName: new RegExp(req.body.search),
      });
      let Users = await User.find(
        {
          // 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾음
          name: new RegExp(req.body.search),
        },
        { name: 1, totalTime: 1 },
      ).limit(20);
      if (Users.length === 0) Users = [];
		
      return res
            .status(200)
            .json({ success: true, Groups, Users });
    } catch (err) {
      return res.status(500).json({ success: false, err });
    }
  },
};

module.exports = {
  post,
};
