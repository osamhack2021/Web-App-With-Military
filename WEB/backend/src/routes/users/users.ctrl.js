const { User } = require('../../models/User');

const output = {
  auth: (req, res) => {
    res.status(200).json({
      _id: req.user._id,
      isAuth: true,
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      division: req.user.division,
      activeStudyGroupList: req.user.activeStudyGroupList,
    });
  },

  logout: (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    });
  },
};

const process = {
  login: (req, res) => {
    User.findOne({ id: req.body.id }, (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: '존재하지 않는 아이디 입니다.',
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: '비밀번호가 틀렸습니다.',
          });
        }
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie('x_auth', user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
        });
      });
    });
  },
  register: (req, res) => {
    const user = new User(req.body);

    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  },
};

module.exports = {
  output,
  process,
};
