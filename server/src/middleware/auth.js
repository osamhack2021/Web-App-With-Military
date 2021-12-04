const { User } = require('../models/User');

let auth = (req, res, next) => {
	let token = req.cookies.w_auth;
	User.findOne({ token: token })
		.populate('groupList')
		.exec((err, user) => {
			if (err) throw err;
			if (!user) return res.json({ isAuth: false, error: true });
			req.token = token;
			req.user = user;
			return next();
		});
};

module.exports = { auth };