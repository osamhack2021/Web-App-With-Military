const express = require('express');

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./studying.ctrl');

router.get('/', auth, ctrl.output.status);
router.post('/start', auth, ctrl.process.start);
router.get('/end', auth, ctrl.output.end);
router.get('/pause', auth, ctrl.output.pause);
router.get('/resume', auth, ctrl.output.resume);

module.exports = router;
