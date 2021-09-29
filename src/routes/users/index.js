const express = require('express');
const router = express.Router();

//const { auth } = require('../../middleware/auth');

const userCtrl = require('./users.ctrl');

//router.get('/auth', auth, userCtrl.auth);
//router.get('/logout', auth, userCtrl.logout);

router.get('/check', userCtrl.check);
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);


module.exports = router;