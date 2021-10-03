const express = require('express');

const router = express.Router();
const checkLoggedin = require('../../middleware/checkLoggedin');

// const { auth } = require('../../middleware/auth');

const userCtrl = require('./users.ctrl');

router.get('/check', userCtrl.check);
router.post('/login', userCtrl.login);

router.post('/register', userCtrl.register);
router.get('/logout', checkLoggedin, userCtrl.logout);
router.post('/search', userCtrl.search);

module.exports = router;
