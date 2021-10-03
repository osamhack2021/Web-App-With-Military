const jwt = require('jsonwebtoken');
const User = require('../models/USER');

// 토큰 유효성 검증, 연장확인
const jwtMiddleWare = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ?위조된 토큰 검증하는 구문 추가 예정

    // res.locals에 토큰 정보 넣기
    res.locals = {
      isLoggedin: true,
      _id: decoded._id,
    };

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 10) {
      const user = await User.findById(decoded._id);
      const newToken = user.generateToken();
      res.cookie('access_token', newToken, {
        maxAge: 1000 * 60 * 20,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    return next();
  }
};

module.exports = jwtMiddleWare;
