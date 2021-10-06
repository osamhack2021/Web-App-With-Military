const { User } = require('../models/User');

const auth = (req, res, next) => {
  const token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
	req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
