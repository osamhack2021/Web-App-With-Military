const { User } = require('../../models/User');
const { Group } = require('../../models/Group');
const { Tag } = require('../../models/Tag');

const get = {
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
    return res.status(200).json({ success: true, result});
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
    return res.status(200).json({ success: true, result});
  },

  // 인기 태그
  tag: async (req, res) => {
    const result = await Tag.aggregate([
      // Project with an array length
      {
        $project: {
          tagName: 1,
          groupList: 1,
          length: { $size: '$groupList' },
        },
      },

      // Sort on the "length"
      { $sort: { length: -1 } },

      // Project if you really want
      {
        $project: {
          tagName: 1,
          length: 1,
        },
      },
    ]);
    return res.status(200).json({ success: true, result});
  },
};

module.exports = {
  get,
};
