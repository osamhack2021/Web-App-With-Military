const express = require('express');

const router = express.Router();
const { auth } = require('../../middleware/auth');
const ctrl = require('./groups.ctrl');

router.post('/create', auth, ctrl.process.create);
router.post('/join', auth, ctrl.process.join);
router.post('/search', ctrl.process.search);
router.post('/tagging', ctrl.process.tagging);

module.exports = router;
