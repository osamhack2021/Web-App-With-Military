const { User } = require('../../models/User');

const output = {
  // 로그인 확인 후 정보 표시
  auth: (req, res) => {
    User.findOne({ userName: req.user.userName })
      .populate('groupList')
      .exec((err, user) => {
        if (err) return res.status(400).json(err);
        return res.status(200).send({ user: user.serialize() });
      }); // 또는 populate({ path: 'groupList' })도 가능
  },

  // 로그아웃 처리
  logout: (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, err => {
      if (err) return res.status(400).json(err);
      return res.cookie('x_auth', '').status(200);
    });
  },
};

const process = {
  // 로그인 처리
  login: (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(403).json({
        loginFailure: { form: true },
      });
    }
    // 이메일 존재 여부 확인
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.status(403).json({
          loginFailure: { email: true },
        });
      }
      // DB에 저장된 user의 password와 비교
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return req.status(403).json(err);
        if (!isMatch) {
          return res.json({
            loginFailure: { password: true },
          });
        }
        // 토큰 생성 및 쿠키에 저장
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          return res
            .cookie('x_auth', user.token, {
              // 유효기간 : 24시간
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .status(200)
            .json({ user: user.serialize() });
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
        return res.status(409).json({
          registerFailure: { email: true },
        });
      }
      // 데이터베이스 저장
      await user.save(err => {
        if (err) return res.status(400).json(err);
        return res.status(200).json({
          user: user.serialize(),
        });
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  // 유저 검색
  search: async (req, res) => {
    const result = await User.find(
      {
        // 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾음
        userName: new RegExp(req.body.searchUser),
      },
      { userName: 1 },
    ).limit(20);
    if (!result.length)
      return res.status(200).json({ searchFailure: { result: true } });
    return res.status(200).json(result);
  },

  // 특정 유저 정보 조회
  profile: async (req, res) => {
    // totalTime 기준으로 rank 부여
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
        },
      },
    ]);

    // 호출한 유저 필터링
    function isUser(element) {
      if (element.userName === req.body.userName) {
        return true;
      }
    }
    const final = await result.filter(isUser);

    // rank 저장 후 정보 표시
    User.findOneAndUpdate(
      { userName: req.body.userName },
      { $set: { rank: final[0].rank } },
    )
      .populate('groupList')
      .exec(async (err, user) => {
        if (err) return res.status(400).json(err);
        user.rank = final[0].rank;
        return res.status(200).send(user.serialize());
      });
  },
};

module.exports = {
  output,
  process,
};
