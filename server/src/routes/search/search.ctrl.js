const { Group } = require('../../models/Group');
const { User } = require('../../models/User');
const { Tag } = require('../../models/Tag');

const process = {
  // 그룹 검색
  all: async (req, res) => {
    try {
      if (req.body.search === '')
        return res
          .status(200)
          .json({ success: true, group: null, users: null });
      const group = await Group.find({
        // 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾음
        groupName: new RegExp(req.body.search),
      });
      let USERS = await User.find(
        {
          // 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾음
          userName: new RegExp(req.body.search),
        },
        { userName: 1, totalTime: 1 },
      ).limit(20);
      if (USERS.length === 0) USERS = null;
      await Tag.find({
        groupList: req.body.search,
      })
        .populate('groupList')
        .exec((err, tag) => {
          let array = [];
          if (tag !== undefined) {
            for (let i = 0; i < tag.length; i++) {
              if (tag[i].groupList.length)
                array = array.concat(tag[i].groupList);
            }
          }
          array = array.concat(group);
          let GROUPS = Array.from(
            new Map(array.map(elem => [elem._id.toString(), elem])).values(),
          );
          if (GROUPS.length === 0) GROUPS = null;
          return res
            .status(200)
            .json({ success: true, group: GROUPS, user: USERS });
        });
    } catch (err) {
      return res.status(500).json({ success: false, err });
    }
  },
};

module.exports = {
  process,
};
