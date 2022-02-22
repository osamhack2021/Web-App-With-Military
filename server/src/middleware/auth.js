const { User } = require('../models/User/User');

const auth = (req, res, next) => {
  const token = req.cookies.w_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(200).json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    return next();
  });
};

module.exports = { auth };
