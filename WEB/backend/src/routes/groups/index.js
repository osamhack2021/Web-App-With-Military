const express = require('express');

const router = express.Router();
const { auth } = require('../../middleware/auth');
const ctrl = require('./groups.ctrl');

router.post('/create', auth, ctrl.process.create);
router.post('/join', auth, ctrl.process.join);
router.post('/search', ctrl.process.search);

module.exports = router;
