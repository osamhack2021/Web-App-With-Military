const User = require('../../models/USER');

const output = {
  // 전체시간 기준으로 50명 까지 내림차순 정렬
  totalTime: async (req, res) => {
    const result = await User.find({})
      .sort({
        userTotalTime: -1,
      })
      .limit(50);
    return res.status(200).json(result);
  },
};

module.exports = {
  output,
};
