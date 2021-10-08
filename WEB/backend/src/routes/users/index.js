const express = require('express');

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./users.ctrl');

router.get('/auth', auth, ctrl.output.auth);
router.get('/logout', auth, ctrl.output.logout);
router.get('/info', auth, ctrl.output.info);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);
router.post('/search', ctrl.process.search);

module.exports = router;
