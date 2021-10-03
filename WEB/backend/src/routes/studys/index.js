const express = require('express');

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./studys.ctrl');

router.get('/', auth, ctrl.output.status);
router.get('/start', auth, ctrl.output.start);
router.get('/end', auth, ctrl.output.end);

module.exports = router;
