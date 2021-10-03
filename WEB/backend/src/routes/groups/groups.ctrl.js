const { Group } = require('../../models/Group');

const output = {
  // 로그인한 유저가 가입한 그룹들의 정보
  info: (req, res) => {
    const groupName = req.user.activeGroups;
    Group.find({ groupName }, function (err, obj) {
      if (err) res.status(500).json({ infoSuccess: false });
      return res.status(200).json({ infoSuccess: true, obj });
    });
  },
};

const process = {
  // 그룹 만들기
  create: async (req, res) => {
    // 그룹이름 중복 여부 확인
    const groupName = await Group.findByGroupName(req.body.groupName);
    if (groupName)
      return res.status(409).json({
        createSuccess: false,
        message: '이미 사용중인 그룹 이름입니다.',
      });
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
    const groupName = await Group.findByGroupName(req.body.groupName);
    if (!groupName)
      return res
        .status(409)
        .json({ joinSuccess: false, message: '존재하지 않는 그룹입니다.' });
    // 이미 해당 그룹에 가입 했는지 확인
    for (let i = 0; i < groupName.members.length; i += 1) {
      if (groupName.members[i] === req.body.newMember)
        return res
          .status(409)
          .json({ joinSuccess: false, message: '이미 존재하는 유저입니다.' });
    }
    // 새로운 멤버 DB에 저장
    await Group.findOneAndUpdate(
      { groupName: req.body.groupName },
      { $addToSet: { members: req.body.newMember } },
      (err, joinSuccess) => {
        if (err) {
          return res.status(500).json({ joinSuccess: false });
        }
        return res.status(200).json({ joinSuccess: true });
      },
    );
  },

  // 그룹 검색
  search: async (req, res) => {
    const result = await Group.find(
      {
        // 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾음
        groupName: new RegExp(req.body.searchGroup),
      },
      { groupName: 1 },
    ).limit(20);
    if (!result.length)
      return res.status(200).json({ message: '검색 결과가 없습니다.' });
    return res.status(200).json(result);
  },
};

module.exports = {
  output,
  process,
};
