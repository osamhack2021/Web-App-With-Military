const { User } = require('../../models/User');

const output = {
  // 타이머 시작
  start: async (req, res) => {
    await User.findOneAndUpdate(
      { userName: req.user.userName },
      { $set: { startTime: new Date() } },
      (err, user) => {
        if (err) {
          return res.status(500).json({ startSuccess: false });
        }
        return res.status(200).json({ startSucess: true });
      },
    );
  },

  // 타이머 끝
  end: async (req, res) => {
    let TIME = 0;
    await User.findOne({ userName: req.user.userName }, async (err, user) => {
      if (err) {
        return res.status(500).json({ endSuccess: false });
      }
      TIME = Math.floor((new Date() - user.startTime) / 60000);
      await User.findOneAndUpdate(
        { userName: req.user.userName },
        { $set: { startTime: null, userTotalTime: user.userTotalTime + TIME } },
        (err, user) => {
          if (err) {
            return res.status(500).json({ endSuccess: false });
          }
          return res.status(200).json(TIME);
        },
      );
    });
  },

  // 타이머 경과 시간
  status: async (req, res) => {
    await User.findOne({ userName: req.user.userName }, (err, user) => {
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
