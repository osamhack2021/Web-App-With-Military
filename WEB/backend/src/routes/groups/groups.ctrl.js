const { Group } = require('../../models/Group');

const output = {
  info: (req, res) => {
    const name = req.user.activeStudyGroupList[0];
    Group.findOne({ name }, function (err, obj) {
      res.status(200).json(obj);
    });
  },
};

const process = {
  create: (req, res) => {
    const group = new Group(req.body);

    group.save((err, groupInfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  },
  register: (req, res) => {
    Group.findOneAndUpdate(
      { name: req.body.groupName },
      { $push: { members: req.body.newMember } },
      function (error, success) {
        if (error) {
          res.status(200).json({ success: false });
        } else {
          res.status(200).json({ success: true });
        }
      },
    );
  },
};

module.exports = {
  output,
  process,
};
