const User = require('../../models/USER');

/*
  토큰 검증시
  GET /users/check

  회원가입시
  POST /users/register
  {
    email: 'withmillitart@gmail.com'
    password: '1q2w3e4r!'
    name: '윤장한'
  }

  로그인시
  POST /users/login
  {
    email: 'withmillitart@gmail.com'
    password: '1q2w3e4r!'
  }
*/

// 토큰 검증
const check = async (req, res, next) => {
  const userId = res.locals.id;
  if (!userId) {
    // 로그인 중 아님
    const error = new Error(`로그인 중이 아닙니다`);
    error.body = {
      // ?추가 예정
    };
    error.status = 401;
    next(error);
  }
  // id로 user문서 반환
  const user = await User.findById(userId);
  res.json({ user: user.serialize() });
};

// 회원가입 처리
const register = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    // email 존재유무 확인
    const exist = await User.findByEmail(email);
    if (exist) {
      const error = new Error(`${email}은 이미 사용중인 이메일입니다`);
      error.body = {
        registerFailure: { email: true },
      };
      error.status = 212;
      return next(error);
    }
    const user = new User({ email, name });
    await user.setPassword(password); //  암호화된 비밀번호 설정
    await user.save(err => {
      if (err) console.log(err);
    }); // 데이터베이스 저장

    // 토큰 발급
    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 20,
      httpOnly: true,
    });

    return res.json({ user: user.serialize() });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

// 로그인 처리
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error(`로그인 폼 오류`);
    error.status = 401;
    return next(error);
  }

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      const error = new Error(`존재하지 않는 아이디입니다`);
      error.status = 210;
      error.body = { loginFailure: { email: true } };
      return next(error);
    }
    const valid = await user.comparePassword(password);
    // console.log(valid);
    if (!valid) {
      const error = new Error(`비밀번호가 일치하지 않습니다`);
      error.status = 211;
      error.body = { loginFailure: { password: true } };
      return next(error);
    }

    // 토큰 발급
    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 20,
      httpOnly: true,
    });
    // console.log(user.serialize());
    return res.json({ user: user.serialize() });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

// 로그아웃 처리
const logout = async (req, res, next) => {
  res.clearCookie('access_token');
  res.status(204);
  next();
};

// 사용자 검색
const search = async (req, res, next) => {
  const result = await User.find(
    {
      // 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾음
      name: req.body.searchUser,
    },
    { name: true }, // ???이후 필요시 이름 이외의 정보도 불러와야함
  ).limit(20);
  if (!result.length) {
    res.status(213).json({ message: '검색 결과가 없습니다.' });
    return next();
  }
  res.status(200).json(result);
  return next();
};

module.exports = { register, login, check, logout, search };
