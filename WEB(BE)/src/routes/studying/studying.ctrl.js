const { User } = require('../../models/User');
const { Group } = require('../../models/Group');

const output = {
  // 타이머 일시정지
  pause: (req, res) => {
    const now = new Date();
    if (req.user.pauseTime)
      return res
        .status(200)
        .json({ isSuccessful: false, message: '이미 쉬는 중 입니다!' });
    if (!req.user.startTime)
      return res
        .status(200)
        .json({ isSuccessful: false, isStudyingNow: false });

    User.findOneAndUpdate(
      { userName: req.user.userName },
      { $set: { pauseTime: now } },
      err => {
        if (err) {
          return res.status(500).json({ isSuccessful: false, err });
        }
        return res.status(200).json({
          isSuccessful: true,
          elapsedTime: Math.floor((new Date() - req.user.startTime) / 1000),
          isStudyingNow: true,
        });
      },
    );
  },

  // 타이머 재개
  resume: (req, res) => {
    let now = new Date();
    if (!req.user.pauseTime)
      return res
        .status(200)
        .json({ isSuccessful: false, message: '일시정지 상태가 아닙니다.' });
    now = now - req.user.pauseTime + req.user.startTime.valueOf();
    User.findOneAndUpdate(
      { userName: req.user.userName },
      { $set: { pauseTime: null, startTime: now } },
      err => {
        if (err) {
          return res.status(500).json({ isSuccessful: false, err });
        }
        return res.status(200).json({
          isSuccessful: true,
          elapsedTime: Math.floor((new Date() - req.user.startTime) / 1000),
          isStudyingNow: true,
        });
      },
    );
  },

  // 타이머 경과 시간
  status: (req, res) => {
    const now = new Date();
    if (!req.user.startTime)
      return res
        .status(200)
        .json({ isSuccessful: false, isStudyingNow: false });
    return res.status(200).json({
      isSuccessful: true,
      elapsedTime: Math.floor((now - req.user.startTime) / 1000),
      isStudyingNow: true,
      activeGroup: req.user.activeGroup,
      activeCategory: req.user.activeCategory,
    });
  },

  // 타이머 종료
  end: async (req, res, next) => {
    let now = await new Date();
    if (!req.user.startTime)
      return res
        .status(200)
        .json({ isSuccessful: false, message: '공부를 시작해주세요.' });
    if (req.user.pauseTime)
      req.user.startTime =
        now - req.user.pauseTime + req.user.startTime.valueOf();
    now = await Math.floor((now - req.user.startTime) / 1000);
    try {
      if (req.user.activeGroup !== null) {
        Group.findOne(
          { groupName: req.user.activeGroup },
          async (err, group) => {
            try {
              await Group.findOneAndUpdate(
                { groupName: req.user.activeGroup },
                {
                  $set: {
                    totalTime: group.totalTime + now,
                  },
                },
              );
            } catch (err) {
              res.status(500).json(err);
            }
          },
        );
      }
      const today = new Date();
      const year = today.getFullYear();
      const month = `0${today.getMonth() + 1}`.slice(-2);
      const day = `0${today.getDate()}`.slice(-2);
      const dateString = `${year}-${month}-${day}`;

      const USER = await User.findById(req.user._id);
      const array = await [{ day: dateString }].concat(USER.history);

      const result = await Array.from(
        new Map(array.map(elem => [elem.day.toString(), elem])).values(),
      );

      USER.history = await result;

      await USER.history.map(async his => {
        if (his.day === dateString) {
          if (his.value === undefined) his.value = 0;
          his.value += await now;

          if (his[req.user.activeCategory] === undefined)
            his[req.user.activeCategory] = await 0;
          his[req.user.activeCategory] += await now;
        }
      });

      USER.startTime = null;
      USER.totalTime += now;
      USER.pauseTime = null;
      USER.activeGroup = null;
      USER.activeCategory = null;

      const temp = await new User(USER);
      await temp.save(err => {
        return res.status(200).json({
          isSuccessful: true,
          elapsedTime: now,
          activeGroup: req.user.activeGroup,
          activeCategory: req.user.activeCategory,
        });
      });
    } catch (err) {
      next(err);
    }
  },
};

const process = {
  // 타이머 시작
  start: async (req, res) => {
    if (req.user.startTime)
      return res.status(200).json({
        isSuccessful: false,
        message: '이미 공부 중 입니다.',
      });
    if (req.body.groupName === undefined) req.body.groupName = null;
    const group = await Group.findOne({ groupName: req.body.groupName });
    if (req.body.category === undefined)
      req.body.category = await group.category;

    const now = new Date();

    try {
      await User.findOneAndUpdate(
        { userName: req.user.userName },
        {
          $set: {
            startTime: now,
            activeGroup: req.body.groupName,
            activeCategory: req.body.category,
          },
        },
      );
      return res.status(200).json({
        isSuccessful: true,
        elapsedTime: 0,
        isStudyingNow: true,
        activeGroup: req.body.groupName,
        activeCategory: req.body.category,
      });
    } catch (err) {
      return res.status(500).json({ isSuccessful: false, err });
    }
  },
};

module.exports = {
  output,
  process,
};
