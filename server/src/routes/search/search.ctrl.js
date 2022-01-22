const { Group } = require('../../models/Group');
const { User } = require('../../models/User');
const { Tag } = require('../../models/Tag');

const post = {
  // 그룹 검색
  all: async (req, res) => {
    try {
      if (req.body.search === '')
        return res
          .status(200)
          .json({ success: true, group: [], users: [] });
      const group = await Group.find({
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
          let Groups = Array.from(
            new Map(array.map(elem => [elem._id.toString(), elem])).values(),
          );
          if (Groups.length === 0) Groups = [];
          return res
            .status(200)
            .json({ success: true, Groups, Users });
        });
    } catch (err) {
      return res.status(500).json({ success: false, err });
    }
  },
};

module.exports = {
  post,
};
