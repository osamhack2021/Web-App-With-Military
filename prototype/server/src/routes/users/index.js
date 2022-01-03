const express = require('express');

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./users.ctrl');

router.get('/auth', auth, ctrl.auth);
router.get('/logout', auth, ctrl.logout);

router.post('/login', ctrl.login);
router.post('/register', ctrl.register);
router.post('/profile', ctrl.profile);
router.post('/edit', auth, ctrl.edit);

module.exports = router;
