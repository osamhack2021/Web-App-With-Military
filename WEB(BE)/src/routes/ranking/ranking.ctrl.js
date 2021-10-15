const { User } = require('../../models/User');
const { Group } = require('../../models/Group');

const output = {
  // 전체 유저 랭킹
  user: async (req, res) => {
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
          rank: {
            $add: ['$rank', 1],
          },
          password: null,
          token: null,
          create: null,
          email: null,
        },
      },
    ]);
    return res.status(200).json(result);
  },

  // 전체 그룹 랭킹
  group: async (req, res) => {
    const result = await Group.aggregate([
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
          rank: {
            $add: ['$rank', 1],
          },
        },
      },
    ]);
    return res.status(200).json(result);
  },
};

module.exports = {
  output,
};
