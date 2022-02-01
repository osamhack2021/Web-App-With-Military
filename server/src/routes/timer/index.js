const express = require('express');

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./timer.ctrl');

router.get('/', auth, ctrl.get.status);
router.get('/end', auth, ctrl.get.end);
router.get('/pause', auth, ctrl.get.pause);
router.get('/resume', auth, ctrl.get.resume);
router.post('/start', auth, ctrl.post.start);

module.exports = router;
