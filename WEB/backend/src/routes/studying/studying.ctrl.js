const { User } = require('../../models/User');

const output = {
  // 타이머 시작
  start: (req, res) => {
    const now = new Date();
    User.findOne({ name: req.user.name }, (err, user) => {
      if (err) {
        return res.status(500).json({ isSuccessful: false, err });
      }
      if (user.startTime)
        return res.status(200).json({
          isSuccessful: false,
          message: '이미 공부 중 입니다.',
        });

      User.findOneAndUpdate(
        { name: req.user.name },
        { $set: { startTime: now } },
        err => {
          if (err) {
            return res.status(500).json({ isSuccessful: false, err });
          }
          return res.status(200).json({
            isSuccessful: true,
            elapsedTime: 0,
            isStudyingNow: true,
          });
        },
      );
    });
  },

  pause: (req, res) => {
    const now = new Date();
    User.findOne({ name: req.user.name }, (err, user) => {
      if (err) {
        return res.status(500).json({ isSuccessful: false, err });
      }
      if (user.pauseTime)
        return res
          .status(200)
          .json({ isSuccessful: false, message: '이미 쉬는 중 입니다!' });
      if (!user.startTime)
        return res
          .status(200)
          .json({ isSuccessful: false, isStudyingNow: false });

      User.findOneAndUpdate(
        { name: req.user.name },
        { $set: { pauseTime: now } },
        err => {
          if (err) {
            return res.status(500).json({ isSuccessful: false, err });
          }
          return res.status(200).json({
            isSuccessful: true,
            elapsedTime: Math.floor((new Date() - user.startTime) / 1000),
            isStudyingNow: true,
          });
        },
      );
    });
  },

  resume: (req, res) => {
    let now = new Date();
    User.findOne({ name: req.user.name }, (err, user) => {
      if (err) {
        return res.status(500).json({ isSuccessful: false, err });
      }
      if (!user.pauseTime)
        return res
          .status(200)
          .json({ isSuccessful: false, message: '일시정지 상태가 아닙니다.' });
      now = now - user.pauseTime + user.startTime.valueOf();
      User.findOneAndUpdate(
        { name: req.user.name },
        { $set: { pauseTime: null, startTime: now } },
        err => {
          if (err) {
            return res.status(500).json({ isSuccessful: false, err });
          }
          return res.status(200).json({
            isSuccessful: true,
            elapsedTime: Math.floor((new Date() - user.startTime) / 1000),
            isStudyingNow: true,
          });
        },
      );
    });
  },

  // 타이머 종료
  end: (req, res) => {
    let now = new Date();
    User.findOne({ name: req.user.name }, (err, user) => {
      if (err) {
        return res.status(500).json({ isSuccessful: false, err });
      }
      if (!user.startTime)
        return res
          .status(200)
          .json({ isSuccessful: false, message: '공부를 시작해주세요.' });
      if (user.pauseTime)
        user.startTime = now - user.pauseTime + user.startTime.valueOf();
      now = Math.floor((now - user.startTime) / 1000);
      User.findOneAndUpdate(
        { name: req.user.name },
        {
          $set: {
            startTime: null,
            totalTime: now,
            pauseTime: null,
          },
        },
        err => {
          if (err) {
            return res.status(500).json({ isSuccessful: false, err });
          }
          return res.status(200).json({ isSuccessful: true, elapsedTime: now });
        },
      );
    });
  },

  // 타이머 경과 시간
  status: (req, res) => {
    const now = new Date();
    User.findOne({ name: req.user.name }, (err, user) => {
      if (err) {
        return res.status(500).json({ isSuccessful: false, err });
      }
      if (!user.startTime)
        return res
          .status(200)
          .json({ isSuccessful: false, isStudyingNow: false });
      return res.status(200).json({
        isSuccessful: true,
        elapsedTime: Math.floor((now - user.startTime) / 1000),
        isStudyingNow: true,
      });
    });
  },
};

module.exports = {
  output,
};
