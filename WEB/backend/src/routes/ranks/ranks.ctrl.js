const { User } = require('../../models/User');

const output = {
  totalTime: async (req, res) => {
    const result = await User.find({})
      .sort({
        userTotalTime: -1,
      })
      .limit(50);
    res.status(200).json(result);
  },
};

module.exports = {
  output,
};
