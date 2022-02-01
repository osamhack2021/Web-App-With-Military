const { User } = require('../../models/User');
const { Group } = require('../../models/Group');

function seoul() {
  const temp = new Date();
  temp.setHours(temp.getHours() + 9);
  return temp;
}

const get = {
  // 타이머 일시정지
  pause: (req, res) => {
    const now = seoul();
    if (req.user.pauseTime)
      return res
        .status(200)
        .json({ success: false, message: '이미 쉬는 중 입니다!' });
    if (!req.user.startTime)
      return res.status(200).json({ success: false, isStudyingNow: false });

    User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { pauseTime: now } },
      err => {
        if (err) {
          return res.status(500).json({ success: false, err });
        }
        return res.status(200).json({
          success: true,
          elapsedTime: Math.floor((seoul() - req.user.startTime) / 1000),
          isStudyingNow: true,
        });
      },
    );
  },
  // 타이머 재개
  resume: (req, res) => {
    let now = seoul();
    if (!req.user.pauseTime)
      return res
        .status(200)
        .json({ success: false, message: '일시정지 상태가 아닙니다.' });
    now = now - req.user.pauseTime + req.user.startTime.valueOf();
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { pauseTime: null, startTime: now } },
      err => {
        if (err) {
          return res.status(500).json({ success: false, err });
        }
        return res.status(200).json({
          success: true,
          elapsedTime: Math.floor((seoul() - now) / 1000),
          isStudyingNow: true,
        });
      },
    );
  },

  // 타이머 경과 시간
  status: (req, res) => {
    const now = seoul();
    if (!req.user.startTime)
      return res.status(200).json({ success: true, isStudyingNow: false });
    if (req.user.pauseTime) {
      return res.status(200).json({
        success: true,
        elapsedTime: Math.floor(
          (req.user.pauseTime - req.user.startTime) / 1000,
        ),
        isStudyingNow: true,
        isPaused: true,
        activeGroup: req.user.activeGroup,
        activeCategory: req.user.activeCategory,
      });
    }
    return res.status(200).json({
      success: true,
      elapsedTime: Math.floor((now - req.user.startTime) / 1000),
      isStudyingNow: true,
      isPaused: false,
      activeGroup: req.user.activeGroup,
      activeCategory: req.user.activeCategory,
    });
  },

  // 타이머 종료
  end: async (req, res) => {
    let now = await seoul();
    if (!req.user.startTime)
      return res
        .status(200)
        .json({ success: false, message: '공부를 시작해주세요.' });
    if (req.user.pauseTime)
      req.user.startTime =
        now - req.user.pauseTime + req.user.startTime.valueOf();
    now = await Math.floor((now - req.user.startTime) / 1000);
    try {
      if (req.user.activeGroup !== null) {
        await Group.findOneAndUpdate(
			{ _id: req.user.activeGroup },
			{
			  $inc: { totalTime: now}
			},
		  );
      }
      const today = seoul();
      const year = today.getFullYear();
      const month = `0${today.getMonth() + 1}`.slice(-2);
      const day = `0${today.getDate()}`.slice(-2);
      const dateString = `${year}-${month}-${day}`;

      User.findOne({ _id: req.user._id }, async (err, USER) => {
        const array = await [{ day: dateString }].concat(USER.history);

        let result = await Array.from(
          new Map(array.map(elem => [elem.day.toString(), elem])).values(),
        );

        await result.map(async his => {
          if (his.day === dateString) {
            if (his.value === undefined) his.value = 0;
            his.value += await now;

            if (his[req.user.activeCategory] === undefined)
              his[req.user.activeCategory] = await 0;
            his[req.user.activeCategory] += await now;
          }
        });

        result = await result.sort((a, b) => {
          const x = a.day;
          const y = b.day;
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
          return 0;
        });

        // 스트릭 구하기
        let streak = 1;
        let yesterday = new Date(
          new Date(year, month - 1, day).setDate(
            new Date(year, month - 1, day).getDate() - 1,
          ),
        );
        // yesterday에 어제의 값을 넣고 다음 배열과 같으면 ++ 다르면 break
        for (let i = 1; i < result.length; i++) {
          const year2 = result[i].day.substring(0, 4);
          const month2 = result[i].day.substring(5, 7);
          const day2 = result[i].day.substring(8, 10);
          if (String(yesterday) === String(new Date(year2, month2 - 1, day2)))
            streak += 1;
          else break;
          yesterday = new Date(
            new Date(year2, month2 - 1, day2).setDate(
              new Date(year2, month2 - 1, day2).getDate() - 1,
            ),
          );
        }

        let { maxStreak } = USER;
        if (maxStreak < streak) maxStreak = streak;
		let rank = await User.find({ totalTime : { $gt : USER.totalTime + now }}).count();
		  
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $set: {
              history: result,
              startTime: null,
              pauseTime: null,
              activeGroup: null,
              activeCategory: null,
              totalTime: USER.totalTime + now,
              curStreak: streak,
              maxStreak,
			  rank: rank+1,
            },
          },
          (err, user) => {
            if (err) return res.status(500).json({ success: false, err });
            return res.status(200).json({
              success: true,
              elapsedTime: now,
              activeGroup: req.user.activeGroup,
              activeCategory: req.user.activeCategory,
            });
          },
        );
      });
    } catch (err) {
      return res.status(500).json({ success: false, err });
    }
  },
};

const post = {
  // 타이머 시작
  start: async (req, res) => {
    if (req.user.startTime)
      return res.status(200).json({
        success: false,
        message: '이미 공부 중 입니다.',
      });

    if (req.body.groupId === undefined) req.body.groupId = null;
    else {
      const group = await Group.findOne({ _id: req.body.groupId });
      if (req.body.category === undefined)
        req.body.category = await group.category;
    }

    const now = seoul();

    try {
      await User.findOneAndUpdate(
        { name: req.user.name },
        {
          $set: {
            startTime: now,
            activeGroup: req.body.groupId,
            activeCategory: req.body.category,
          },
        },
      );
      return res.status(200).json({
        success: true,
        elapsedTime: 0,
        isStudyingNow: true,
        activeGroup: req.body.groupId,
        activeCategory: req.body.category,
      });
    } catch (err) {
      return res.status(500).json({ success: false, err });
    }
  },
};

module.exports = {
  get,
  post,
};
