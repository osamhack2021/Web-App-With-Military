const { User } = require('../../models/User');

const output = {
  totalTime: async (req, res) => {
    const result = await User.aggregate([
      {
        $sort: {
          totalTime: -1,
        },
      },
      {
        $group: {
          // Add in an array
          _id: null,
          items: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $unwind: {
          // De-normalize and get index
          path: '$items',
          includeArrayIndex: 'items.rank',
        },
      },
      {
        $replaceRoot: {
          // Reshape
          newRoot: '$items',
        },
      },
      {
        $addFields: {
          // Add 1 to get to proper rank as array is index starts 0
          newRank: {
            $add: ['$rank', 1],
          },
        },
      },
    ]);

    // const result = await User.find({}).sort({
    //   totalTime: -1,
    // });
    return res.status(200).json(result);
  },
};

module.exports = {
  output,
};
