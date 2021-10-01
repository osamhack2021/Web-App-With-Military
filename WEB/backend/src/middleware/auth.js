const { User } = require('../models/User');

const auth = (req, res, next) => {
  const token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(401).json({ isAuth: false, error: true });
    req.user = user;
    next();
  });
};

module.exports = { auth };
