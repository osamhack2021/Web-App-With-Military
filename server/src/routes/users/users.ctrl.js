const { User } = require('../../models/User');

const get = {
  auth: (req, res) => {
    res.status(200).json({
      _id: req.user._id,
      isAuth: true,
      name: req.user.name,
      email: req.user.email,
      image: req.user.image,
      groupList: req.user.groupList,
    });
  },
  logout: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '', tokenExp: '' },
      err => {
        if (err) return res.status(500).json({ success: false, err });
        return res.cookie('w_auth', '').status(200).json({ success: true });
      },
    );
  },
};

const post = {
  login: (req, res) => {
    // 이메일 존재 여부 확인
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) res.status(500).json({ loginSuccess: false, err });
      if (!user) {
        return res.status(403).json({
          loginSuccess: false,
          message: '존재하지 않는 이메일 입니다.',
        });
      }
      // DB에 저장된 user의 password와 비교
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(500).json({ loginSuccess: false, err });
        if (!isMatch) {
          return res.status(403).json({
            loginSuccess: false,
            message: '비밀번호가 틀렸습니다.',
          });
        }
        // 토큰 생성 및 쿠키에 저장
        user.generateToken((err, user) => {
          if (err) return res.status(500).send({ loginSuccess: false, err });
          res.cookie('w_authExp', user.tokenExp);
          return res
            .cookie('w_auth', user.token, {
              // 유효기간 : 24시간
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .status(200)
            .json({ loginSuccess: true, userId: user._id, image: user.image });
        });
      });
    });
  },
  register: async (req, res) => {
    req.body.created = await new Date().setHours(new Date().getHours() + 9);
    const user = await new User(req.body);
    // email 중복 확인
    User.findOne({ email: user.email }, (err, email) => {
      if (err) {
        return res.status(500).json({ success: false, err });
      }
      if (email) {
        return res.status(409).json({
          success: false,
          message: '이미 사용중인 이메일 입니다.',
        });
      }
      // name 중복 확인
      User.findOne({ name: user.name }, (err, name) => {
        if (name) {
          return res.status(409).json({
            success: false,
            message: '이미 사용중인 유저 이름 입니다.',
          });
        }
      });
      // 데이터베이스 저장
      user.save((err, user) => {
        if (err) {
          return res.status(500).json({ success: false, err });
        }
        return res.status(200).json({
          success: true,
          user: user.serialize(),
        });
      });
    });
  },
  edit: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { info: req.body.info } },
      (err, user) => {
        if (!user) {
          return res.status(400).json({
            success: false,
            message: '존재하지 않는 유저에 접근하였습니다.',
          });
        }
        if (err) return res.status(500).json({ success: false, err });
        return res.status(500).json({ success: true });
      },
    );
  },
  profile: (req, res) => {
    User.findOne({ _id: req.body.userId })
      .populate('groupList')
      .exec((err, user) => {
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: '존재하지 않는 유저 입니다.' });
        }
        if (err) return res.status(500).json({ success: false, err });
        return res.status(200).send({ success: true, user });
      });
  },
};

module.exports = {
  get,
  post,
};
