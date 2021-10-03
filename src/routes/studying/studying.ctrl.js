const User = require('../../models/USER');

const output = {
  // 타이머 시작
  start: (req, res) => {
    const now = new Date();
    User.findOne({ userName: req.user.userName }, (err, user) => {
      if (err) {
        return res.status(500).json({ startSuccess: false });
      }
      if (user.startTime)
        return res
          .status(200)
          .json({ startSuccess: false, message: '이미 공부 중 입니다!' });

      User.findOneAndUpdate(
        { userName: req.user.userName },
        { $set: { startTime: now } },
        (err, user) => {
          if (err) {
            return res.status(500).json({ startSuccess: false });
          }
          return res.status(200).json(now);
        },
      );
    });
  },

  // 타이머 끝
  end: (req, res) => {
    let now = new Date();
    User.findOne({ userName: req.user.userName }, (err, user) => {
      if (err) {
        return res.status(500).json({ endSuccess: false });
      }
      if (!user.startTime)
        return res
          .status(200)
          .json({ startSuccess: false, message: '공부를 시작하세요!' });
      now = Math.floor((now - user.startTime) / 60000);
      User.findOneAndUpdate(
        { userName: req.user.userName },
        { $set: { startTime: null, userTotalTime: user.userTotalTime + now } },
        (err, user) => {
          if (err) {
            return res.status(500).json({ endSuccess: false });
          }
          return res.status(200).json(now);
        },
      );
    });
  },

  // 타이머 경과 시간
  status: (req, res) => {
    User.findOne({ userName: req.user.userName }, (err, user) => {
      if (err) {
        return res.status(500).json({ statusSuccess: false });
      }
      if (!user.startTime)
        return res
          .status(200)
          .json({ statusSuccess: false, message: '공부 중이 아닙니다!' });
      return res
        .status(200)
        .json(Math.floor((new Date() - user.startTime) / 60000));
    });
  },
};

module.exports = {
  output,
};
