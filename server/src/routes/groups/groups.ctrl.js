const fs = require('fs');
const { Group } = require('../../models/Group');
const { User } = require('../../models/User');
const { Category } = require('../../models/Category');
const { GroupBackground } = require('../../models/GroupBackground');

const post = {
  // 그룹 만들기
  create: async (req, res) => {
    req.body.created = await new Date().setHours(new Date().getHours() + 9);
    // 그룹이름 중복 여부 확인
    Group.findOne({ groupName: req.body.groupName }, (err, exist) => {
      if (err) return res.status(500).json({ success: false, err });
      if (exist !== null)
        return res.status(200).json({
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
        return res.status(200).json({
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
        return res.status(200).json({
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
        return res.status(200).json({
          success: false,
          message: '요청한 그룹을 찾을 수 없습니다.',
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
                  return res.status(200).json({
                    success: true,
                    message: '가입승인이 완료되었습니다.',
                  });
                },
              );
            },
          );
        } else {
          return res.status(200).json({
            success: false,
            message: '해당 유저는 참가신청을 하지 않았습니다.',
          });
        }
      } else {
        return res
          .status(200)
          .json({ success: false, message: '관리자가 아닙니다.' });
      }
      // 가입 신청 한 그룹인지 확인
      for (let i = 0; i < group.waiting.length; i++) {
        if (String(group.waiting[i]) === String(req.user._id))
          return res.status(200).json({
            success: false,
            message: '이미 해당 그룹에 가입 신청 하였습니다.',
          });
      }
    });
  },

  // 그룹 참가 신청
  join: (req, res) => {
    Group.findOne({ _id: req.body.groupId }, async (err, group) => {
      if (err) {
        return res.status(500).json({ success: false, err });
      }
      // 존재하는 그룹인지 확인
      if (!group) {
        return res.status(200).json({
          success: false,
          message: '요청한 그룹을 찾을 수 없습니다.',
        });
      }
      // 가입한 그룹인지 확인
      if (String(group.admins[0]) === String(req.user._id)) {
        return res.status(200).json({
          success: false,
          message: '이미 해당 그룹에 관리자 입니다.',
        });
      }
      for (let i = 0; i < group.members.length; i++) {
        if (String(group.members[i]) === String(req.user._id))
          return res.status(200).json({
            success: false,
            message: '이미 해당 그룹에 가입 하였습니다.',
          });
      }

      // 가입 신청 한 그룹인지 확인
      for (let i = 0; i < group.waiting.length; i++) {
        if (String(group.waiting[i]) === String(req.user._id))
          return res.status(200).json({
            success: false,
            message: '이미 해당 그룹에 가입 신청 하였습니다.',
          });
      }

      // 그룹 참가 대기열에 유저 추가
      await Group.findOneAndUpdate(
        { _id: req.body.groupId },
        { $addToSet: { waiting: req.user._id } },
        err => {
          if (err) {
            return res.status(500).json({ success: false, err });
          }
          return res.status(200).json({
            success: true,
            message: '가입 신청이 완료되었습니다',
          });
        },
      );
    });
  },

  // 특정 그룹 정보 조회
  profile: async (req, res) => {
    Group.findOne({ _id: req.body.groupId }).exec((err, group) => {
      // 존재하는 그룹인지 확인
      if (!group) {
        return res.status(200).json({
          success: false,
          message: '존재하지 않는 그룹입니다.',
        });
      }
      if (err) return res.status(500).json({ success: false, err });
      return res.status(200).send({ success: true, group });
    });
  },

  // 그룹 배경 업로드
  background: async (req, res) => {
    try {
      const strArray = req.headers.referer.split('/');
      const groupId = strArray[4];
      const img = req.file.buffer;
      const background = new GroupBackground({ groupId, img });
      await background.save();
      if (img.truncated)
        return res.status(200).jsono({
          success: false,
          message: '이미지 용량이 제한을 초과하였습니다.',
        });
      const groupData = await Group.findOneAndUpdate(
        { _id: groupId },
        {
          $set: {
            background: background._id,
          },
        },
      );
      if (groupData.background) {
        await GroupBackground.findOneAndDelete({ _id: groupData.background });
        fs.unlink(`./uploads/${groupData.background}.png`);
      }
      return res
        .status(200)
        .send({ success: true, backgroundId: background._id });
    } catch (err) {
      return res.status(500).json({ success: false, err });
    }
  },
};

const get = {
  background: async (req, res) => {
    const { id } = req.params;
    const imageData = await GroupBackground.findById(id).exec();
    if (!imageData) return res.status(404).json();
    const imageURL = imageData.img;
    fs.writeFile(`./uploads/${id}.png`, imageURL, err => {
      fs.readFile(`./uploads/${id}.png`, (err, data) => {
        if (err) return res.status(500).json({ success: false, err });
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(data);
        res.end();
      });
    });
  },
};

module.exports = {
  post,
  get,
};
