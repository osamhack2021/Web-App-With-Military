const express = require('express');

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./users.ctrl');

router.get('/auth', auth, ctrl.get.auth);
router.get('/logout', auth, ctrl.get.logout);

router.post('/login', ctrl.post.login);
router.post('/register', ctrl.post.register);
router.post('/profile', ctrl.post.profile);
router.post('/edit', auth, ctrl.post.edit);

module.exports = router;
