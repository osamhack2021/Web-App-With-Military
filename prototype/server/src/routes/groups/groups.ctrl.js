const { Group } = require('../../models/Group');
const { User } = require('../../models/User');
const { Tag } = require('../../models/Tag');
const { Category } = require('../../models/Category');

const process = {
  // 그룹 만들기
  create: (req, res) => {
    // 그룹이름 중복 여부 확인
    Group.findOne({ groupName: req.body.groupName }, (err, exist) => {
      if (err) return res.status(500).json({ success: false, err });
      if (exist !== null)
        return res.status(409).json({
          success: false,
          message: '이미 사용중인 그룹 이름입니다.',
        });

      for (let i = 0; i < req.body.tags.length; i++) {
        Tag.findOne({ tagName: req.body.tags[i] }, (err, exist) => {
          if (err) return res.status(500).json({ success: false, err });
          if (exist === null) {
            const tag = new Tag({ tagName: req.body.tags[i] });
            tag.save(err => {
              if (err)
                return res.status(200).json({ success: false, err });
            });
          }
        });
      }

      const group = new Group(req.body);
      // 새로운 그룹 정보 DB에 저장

      group.save((err, group) => {
        if (err) return res.status(500).json({ success: false, err });
        // 카테고리 DB 에 그룹 저장
        Category.findOneAndUpdate(
          { categoryName: group.category },
          { $addToSet: { groups: group._id } },
          err => {
            if (err) return res.status(500).json({ success: false, err });
            // 그룹 어드민 목록에 해당 유저 추가
            Group.findOneAndUpdate(
              { groupName: group.groupName },
              { $addToSet: { admins: req.user._id, members: req.user._id } },
              err => {
                if (err)
                  return res.status(500).json({ success: false, err });
                // 유저 그룹 목록에 해당 그룹 추가
                User.findOneAndUpdate(
                  { _id: req.user._id },
                  { $addToSet: { groupList: group._id } },
                  err => {
                    if (err)
                      return res.status(500).json({ success: false, err });
                    for (let i = 0; i < req.body.tags.length; i++) {
                      Tag.findOneAndUpdate(
                        { tagName: req.body.tags[i] },
                        { $addToSet: { groupList: group._id } },
                        err => {
                          if (err)
                            return res
                              .status(500)
                              .json({ success: false, err });
                        },
                      );
                    }
                    return res.status(200).json({ success: true });
                  },
                );
              },
            );
          },
        );
      });
    });
  },

  // 그룹 정보 수정
  edit: (req, res) => {
    Group.findOne({ id: req.body.id }, (err, group) => {
      if (err) return res.status(500).json({ success: false, err });
      let admin = false;
      for (let i = 0; i < group.admins.length; i++) {
        if (String(group.admins[i]) === String(req.user._id)) admin = true;
      }
      if (admin) {
        Group.findOneAndUpdate(
          { id: group._id },
          {
            $set: {
              info: req.body.info,
            },
          },
          err => {
            if (err) return res.status(500).json({ success: false, err });
            return res.status(200).json({ success: true });
          },
        );
      } else {
        return res
          .status(403)
          .json({ success: false, message: '관리자가 아닙니다.' });
      }
    });
  },

  // 그룹 삭제
  remove: (req, res) => {
    Group.findOne({ id: req.body.id }, (err, group) => {
      if (err) return res.status(500).json({ success: false, err });
      let admin = false;
      for (let i = 0; i < group.admins.length; i++) {
        if (String(group.admins[i]) === String(req.user._id)) admin = true;
      }
      if (admin) {
        Group.deleteOne({ id: group._id }, err => {
          if (err) return res.status(500).json({ success: false, err });
          return res.status(200).json({ success: true });
        });
      } else {
        return res
          .status(403)
          .json({ success: false, message: '관리자가 아닙니다.' });
      }
    });
  },

  // 그룹 참가 신청 승인
  approve: async (req, res) => {
    try {
      const group = await Group.findByName(req.body.groupName);
      // 존재하는 그룹인지 확인
      if (!group)
        return res
          .status(409)
          .json({ success: false, message: '존재하지 않는 그룹입니다.' });
      let admin = false;
      for (let i = 0; i < group.admins.length; i++) {
        if (String(group.admins[i]) === String(req.user._id)) admin = true;
      }
      if (admin) {
        User.findOne({ name: req.body.name }, (err, user) => {
          if (!user)
            return res.status(409).json({
              success: false,
              message: '존재하지 않는 유저입니다.',
            });
          if (err) res.status(500).json({ success: false, err });
          Group.findOneAndUpdate(
            { groupName: req.body.groupName },
            {
              $addToSet: { members: user._id },
              $pull: { waiting: user._id },
            },
            (err, group) => {
              if (err) res.status(500).json({ success: false, err });
              // 유저 그룹 목록에 해당 그룹 추가
              User.findOneAndUpdate(
                { name: req.body.name },
                { $addToSet: { groupList: group._id } },
                err => {
                  if (err) res.status(500).json({ success: false, err });
                  return res.status(200).json({ success: true });
                },
              );
            },
          );
        });
      } else {
        return res
          .status(403)
          .json({ success: false, message: '관리자가 아닙니다.' });
      }
    } catch (err) {
      if (err) res.status(500).json({ success: false, err });
    }
  },

  // 그룹 검색
  search: async (req, res) => {
    try {
      const group = await Group.find({
        // 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾음
        groupName: new RegExp(req.body.search),
      });

      await Tag.find({
        groupName: req.body.search,
      })
        .populate('groupList')
        .exec((err, tag) => {
          if (err) return res.status(500).json({ success: false, err });
          let array = [];
          for (let i = 0; i < tag.length; i++) {
            if (tag[i].groupList.length) array = array.concat(tag[i].groupList);
          }
          array = array.concat(group);
          const result = Array.from(
            new Map(array.map(elem => [elem._id.toString(), elem])).values(),
          );
          if (!result)
            return res.status(200).json({ message: '검색 결과가 없습니다.' });
          return res.status(200).json({ success: true, result });
        });
    } catch (err) {
      return res.status(500).json({ success: false, err });
    }
  },

  // 그룹 참가 신청
  waiting: async (req, res) => {
    // 존재하는 그룹인지 확인
    const group = await Group.findByName(req.body.groupName);
    if (!group)
      return res
        .status(409)
        .json({ success: false, message: '존재하지 않는 그룹입니다.' });
    // 가입한 그룹인지 확인
    if (String(group.admins[0]) === String(req.user._id))
      return res.status(409).json({
        success: false,
        message: '이미 해당 그룹에 가입하였습니다.',
      });
    for (let i = 0; i < group.members.length; i++) {
      if (String(group.members[i]) === String(req.user._id))
        return res.status(409).json({
          success: false,
          message: '이미 해당 그룹에 가입 하였습니다.',
        });
    }
    // 가입 신청 한 그룹인지 확인
    for (let i = 0; i < group.waiting.length; i++) {
      if (String(group.waiting[i]) === String(req.user._id))
        return res.status(409).json({
          success: false,
          message: '이미 해당 그룹에 가입 신청 하였습니다.',
        });
    }

    // 새로운 유저 그룹 멤버 목록에 추가
    Group.findOneAndUpdate(
      { groupName: req.body.groupName },
      { $addToSet: { waiting: req.user._id } },
      err => {
        if (err) {
          return res.status(500).json({ success: false, err });
        }
        return res.status(200).json({ success: true });
      },
    );
  },

  // 특정 그룹 정보 조회
  profile: async (req, res) => {
    // totalTime 기준으로 rank 부여
    // const result = await Group.aggregate([
    //   {
    //     $sort: {
    //       totalTime: -1,
    //     },
    //   },
    //   {
    //     $group: {
    //       // Add in an array
    //       _id: null,
    //       items: {
    //         $push: '$$ROOT',
    //       },
    //     },
    //   },
    //   {
    //     $unwind: {
    //       // De-normalize and get index
    //       path: '$items',
    //       includeArrayIndex: 'items.rank',
    //     },
    //   },
    //   {
    //     $replaceRoot: {
    //       // Reshape
    //       newRoot: '$items',
    //     },
    //   },
    //   {
    //     $addFields: {
    //       // Add 1 to get to proper rank as array is index starts 0
    //       rank: {
    //         $add: ['$rank', 1],
    //       },
    //     },
    //   },
    // ]);

    // // 호출한 그룹 필터링
    // function isGroup(element) {
    //   if (element.groupName === req.body.groupName) {
    //     return true;
    //   }
    // }
    // const final = await result.filter(isGroup);

    // // rank 저장 후 정보 표시
    // Group.findOneAndUpdate(
    //   { groupName: req.body.groupName },
    //   { $set: { rank: final[0].rank } },
    // )
    //   .populate('members')
    //   .exec(async (err, group) => {
    //     if (err) return res.status(400).json({ success: false, err });
    //     group.rank = await final[0].rank;
    //     return res.status(200).send({ success: true, group });
    //   });
	  Group.findOne({ _id: req.body.groupId})
	  .exec((err, group) => {
		  if (err) return res.status(400).json({ success: false, err });
		  return res.status(200).send({ success: true, group });
	  })
  },
};

module.exports = {
  process,
};
