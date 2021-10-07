const { Group } = require('../../models/Group');

const output = {
  // 로그인한 유저가 가입한 그룹들의 정보
  info: (req, res) => {
    const name = req.user.activeGroups;
    Group.find({ name }, function (err, obj) {
      if (err) res.status(500).json({ infoSuccess: false });
      res.status(200).json({ infoSuccess: true, obj });
    });
  },
};

const process = {
  // 그룹 만들기
  create: async (req, res) => {
    // 그룹이름 중복 여부 확인
    const NAME = await Group.findByGroupName(req.body.name);
    if (NAME)
      return res.status(409).json({ createSuccess: false, group_exists: true });
    const group = new Group(req.body);
    // 새로운 그룹 정보 DB에 저장
    await group.save((err, groupInfo) => {
      if (err) return res.json({ createSuccess: false, err });
      return res.status(200).json({
        createSuccess: true,
      });
    });
  },

  // 그룹에 참가
  join: async (req, res) => {
    // 존재하는 그룹인지 확인
    const NAME = await Group.findByGroupName(req.body.groupName);
    if (!NAME)
      return res.status(409).json({ joinSuccess: false, group_exists: false });
    // 이미 해당 그룹에 가입 했는지 확인
    for (let i = 0; i < NAME.members.length; i += 1) {
      if (NAME.members[i] === req.body.newMember)
        return res.json({ joinSuccess: false, user_exists: true });
    }
    // 새로운 멤버 DB에 저장
    await Group.findOneAndUpdate(
      { name: req.body.groupName },
      { $addToSet: { members: req.body.newMember } },
      (err, joinSuccess) => {
        if (err) {
          return res.status(500).json({ joinSuccess: false });
        }
        return res.status(200).json({ joinSuccess: true });
      },
    );
  },
};

module.exports = {
  output,
  process,
};
