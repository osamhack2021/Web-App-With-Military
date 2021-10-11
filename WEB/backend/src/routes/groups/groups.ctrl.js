const { Group } = require('../../models/Group');
const { User } = require('../../models/User');
const { Tag } = require('../../models/Tag');
const { Category } = require('../../models/Category');

const process = {
  // 그룹 만들기
  create: (req, res) => {
    // 그룹이름 중복 여부 확인
    Group.findOne({ groupName: req.body.groupName }, (err, exist) => {
      if (err) return res.status(500).json({ createSuccess: false, err });
      if (exist)
        return res.status(409).json({
          createSuccess: false,
          message: '이미 사용중인 그룹 이름입니다.',
        });

      const group = new Group(req.body);
      // 새로운 그룹 정보 DB에 저장
      group.save((err, group) => {
        if (err) return res.status(500).json({ createSuccess: false, err });
        // 카테고리 DB 에 그룹 저장
        Category.findOneAndUpdate(
          { categoryName: group.category },
          { $addToSet: { groups: group._id } },
          err => {
            if (err) return res.status(500).json({ createSuccess: false, err });
            // 그룹 어드민 목록에 해당 유저 추가
            Group.findOneAndUpdate(
              { groupName: group.groupName },
              { $addToSet: { admins: req.user._id } },
              err => {
                if (err)
                  return res.status(500).json({ createSuccess: false, err });
                // 유저 그룹 목록에 해당 그룹 추가
                User.findOneAndUpdate(
                  { _id: req.user._id },
                  { $addToSet: { groupList: group._id } },
                  err => {
                    if (err) {
                      if (err)
                        return res
                          .status(500)
                          .json({ createSuccess: false, err });
                    }
                    return res.status(200).json({ createSuccess: true });
                  },
                );
              },
            );
          },
        );
      });
    });
  },

  // 그룹에 참가
  join: async (req, res) => {
    const group = await Group.findByName(req.body.groupName);
    // 존재하는 그룹인지 확인
    if (!group)
      return res
        .status(409)
        .json({ joinSuccess: false, message: '존재하지 않는 그룹입니다.' });

    // 가입 여부 확인
    if (String(group.admins[0] === String(req.body.userName)))
      return res.status(409).json({
        joinSuccess: false,
        message: '이미 해당 그룹에 가입하였습니다.',
      });

    User.findOne({ userName: req.body.userName }, async (err, user) => {
      if (err) res.status(500).json({ joinSuccess: false, err });
      Group.findOneAndUpdate(
        { groupName: req.body.groupName },
        {
          $addToSet: { members: user._id },
          $pull: { waiting: user._id },
        },
        (err, group) => {
          if (err) res.status(500).json({ joinSuccess: false, err });
          // 유저 그룹 목록에 해당 그룹 추가
          User.findOneAndUpdate(
            { userName: req.body.userName },
            { $addToSet: { groupList: group._id } },
            err => {
              if (err) res.status(500).json({ joinSuccess: false, err });
              return res.status(200).json({ joinSuccess: true });
            },
          );
        },
      );
    });
  },

  // 그룹 태깅
  tagging: (req, res) => {
    Group.findOne({ groupName: req.body.groupName }, (err, group) => {
      if (err) {
        return res.status(500).json({ taggingSuccess: false, err });
      }
      Tag.findOneAndUpdate(
        { tagName: req.body.tagName },
        { $addToSet: { groups: group._id } },
        err => {
          if (err) {
            return res.status(500).json({ taggingSuccess: false, err });
          }
          Group.findOneAndUpdate(
            { groupName: req.body.groupName },
            { $set: { tags: req.body.tagName } },
            err => {
              if (err) {
                return res.status(500).json({ taggingSuccess: false });
              }
              return res.status(200).json({ taggingSuccess: true });
            },
          );
        },
      );
    });
  },

  // 그룹 검색
  search: async (req, res, next) => {
    try {
      const group = await Group.find({
        // 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾음
        groupName: new RegExp(req.body.search),
      });

      await Tag.find({
        groupName: req.body.search,
      })
        .populate('groups')
        .exec((err, tag) => {
          if (err) return res.status(400).json(err);
          let array = [];
          for (let i = 0; i < tag.length; i++) {
            if (tag[i].groups.length) array = array.concat(tag[i].groups);
          }
          array = array.concat(group);
          const result = Array.from(
            new Map(array.map(elem => [elem._id.toString(), elem])).values(),
          );
          if (!result)
            return res.status(200).json({ message: '검색 결과가 없습니다.' });
          return res.status(200).json(result);
        });
    } catch (error) {
      return next(error);
    }
  },

  waiting: async (req, res) => {
    // // 존재하는 그룹인지 확인
    const group = await Group.findByName(req.body.groupName);
    // if (!group)
    //   return res
    //     .status(409)
    //     .json({ waitingSuccess: false, message: '존재하지 않는 그룹입니다.' });

    if (String(group.admins[0]) === String(req.user._id))
      return res.status(409).json({
        waitingSuccess: false,
        message: '이미 해당 그룹에 가입하였습니다.',
      });
    // 가입한 그룹인지 확인
    for (let i = 0; i < group.members.length; i++) {
      if (String(group.members[i]) === String(req.user._id))
        return res.status(409).json({
          waitingSuccess: false,
          message: '이미 해당 그룹에 가입 하였습니다.',
        });
    }
    // 가입 신청 한 그룹인지 확인
    for (let i = 0; i < group.waiting.length; i++) {
      if (String(group.waiting[i]) === String(req.user._id))
        return res.status(409).json({
          waitingSuccess: false,
          message: '이미 해당 그룹에 가입 신청 하였습니다.',
        });
    }

    // 새로운 유저 그룹 멤버 목록에 추가
    Group.findOneAndUpdate(
      { groupName: req.body.groupName },
      { $addToSet: { waiting: req.user._id } },
      err => {
        if (err) {
          return res.status(500).json({ waitingSuccess: false });
        }
        return res.status(200).json({ waitingSuccess: true });
      },
    );
  },
};

module.exports = {
  process,
};
