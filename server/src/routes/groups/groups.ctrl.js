const { Group } = require('../../models/Group');
const { User } = require('../../models/User');
const { Category } = require('../../models/Category');

const post = {
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
                if (err) return res.status(500).json({ success: false, err });
                // 유저 그룹 목록에 해당 그룹 추가
                User.findOneAndUpdate(
                  { _id: req.user._id },
                  { $addToSet: { groupList: group._id } },
                  err => {
                    if (err)
                      return res.status(500).json({ success: false, err });
                    return res.status(200).json({ success: true, group });
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
    Group.findOne({ _id: req.body.groupId }, (err, group) => {
      // 존재하는 그룹인지 확인
      if (!group) {
        return res.status(400).json({
          success: false,
          message: '존재하지 않는 그룹에 접근하였습니다.',
        });
      }
      if (err) return res.status(500).json({ success: false, err });
      let admin = false;
      for (let i = 0; i < group.admins.length; i++) {
        if (String(group.admins[i]) === String(req.user._id)) admin = true;
      }
      if (admin) {
        Group.findOneAndUpdate(
          { id: req.body.groupId },
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
    Group.findOne({ _id: req.body.groupId }, (err, group) => {
      // 존재하는 그룹인지 확인
      if (!group) {
        return res.status(400).json({
          success: false,
          message: '존재하지 않는 그룹에 접근하였습니다.',
        });
      }
      if (err) return res.status(500).json({ success: false, err });
      let admin = false;
      for (let i = 0; i < group.admins.length; i++) {
        if (String(group.admins[i]) === String(req.user._id)) admin = true;
      }
      if (admin) {
        Group.deleteOne({ _id: req.body.groupId }, err => {
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
    Group.findOne({ _id: req.body.groupId }, (err, group) => {
      // 존재하는 그룹인지 확인
      if (!group) {
        return res.status(400).json({
          success: false,
          message: '존재하지 않는 그룹에 접근하였습니다.',
        });
      }
      // 관리자 권한 확인
      let admin = false;
      for (let i = 0; i < group.admins.length; i++) {
        if (String(group.admins[i]) === String(req.user._id)) admin = true;
      }
      if (admin) {
        // 참가 신청 확인
        let exist = false;
        for (let i = 0; i < group.waiting.length; i++) {
          if (String(group.waiting[i]) === String(req.body.userId))
            exist = true;
        }
        if (exist) {
          // 대기열에서 제거 및 그룹에 추가
          Group.findOneAndUpdate(
            { _id: req.body.groupId },
            {
              $addToSet: { members: req.body.userId },
              $pull: { waiting: req.body.userId },
            },
            err => {
              if (err) res.status(500).json({ success: false, err });
              // 유저 그룹 목록에 해당 그룹 추가
              User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { groupList: req.body.groupId } },
                err => {
                  if (err) res.status(500).json({ success: false, err });
                  return res.status(200).json({ success: true });
                },
              );
            },
          );
        } else {
          return res.status(403).json({
            success: false,
            message: '해당 유저는 참가신청을 하지 않았습니다.',
          });
        }
      } else {
        return res
          .status(403)
          .json({ success: false, message: '관리자가 아닙니다.' });
      }
      // 가입 신청 한 그룹인지 확인
      for (let i = 0; i < group.waiting.length; i++) {
        if (String(group.waiting[i]) === String(req.user._id))
          return res.status(409).json({
            success: false,
            message: '이미 해당 그룹에 가입 신청 하였습니다.',
          });
      }
    });
  },

  // 그룹 참가 신청
  join: (req, res) => {
    Group.findOne({ _id: req.body.groupId }, (err, group) => {
      // 존재하는 그룹인지 확인
      if (!group) {
        return res.status(400).json({
          success: false,
          message: '존재하지 않는 그룹에 접근하였습니다.',
        });
      }
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
    });

    // 유저 참가 대기열에 추가
    Group.findOneAndUpdate(
      { _id: req.body.groupId },
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
    Group.findOne({ _id: req.body.groupId }).exec((err, group) => {
      // 존재하는 그룹인지 확인
      if (!group) {
        return res.status(404).json({
          success: false,
          message: '존재하지 않는 그룹입니다.',
        });
      }
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).send({ success: true, group });
    });
  },
};

module.exports = {
  post,
};
