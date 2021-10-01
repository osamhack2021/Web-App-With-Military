const { User } = require('../../models/User');

const output = {
  // 로그인 확인 후 정보 표시
  auth: (req, res) => {
    res.status(200).json(req.user);
  },

  // 로그아웃 처리
  logout: (req, res) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.cookie('x_auth', '').status(200).send({ success: true });
    });
  },
};

const process = {
  // 로그인 처리
  login: (req, res, next) => {
    if (!req.body.id || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: '로그인 폼 오류',
      });
    }
    // 아이디 존재 여부 확인
    User.findOne({ id: req.body.id }, (err, user) => {
      if (!user) {
        return res.json({
          success: false,
          message: '아이디 또는 비밀번호가 잘못 입력 되었습니다.',
        });
      }
      // DB에 저장된 user의 password와 비교
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            success: false,
            message: '아이디 또는 비밀번호가 잘못 입력 되었습니다.',
          });
        }
        // 토큰 생성 및 쿠키에 저장
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie('x_auth', user.token).status(200).json({
            success: true,
          });
        });
      });
    });
  },

  // 회원가입 처리
  register: async (req, res) => {
    const user = new User(req.body);
    try {
      // email 중복 확인
      const EMAIL = await User.findByEmail(user.email);
      if (EMAIL) {
        // id 중복 확인
        const ID = await User.findById(user.id);
        if (ID) {
          return res
            .status(409)
            .json({ success: false, isIdInUse: true, isEmailInUse: true });
        }
        return res
          .status(409)
          .json({ success: false, isIdInUse: false, isEmailInUse: true });
      }
    } catch (error) {
      return res.status(500).json({ success: false });
    }

    // 데이터베이스 저장
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
