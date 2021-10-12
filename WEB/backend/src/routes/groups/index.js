const express = require('express');

const router = express.Router();
const { auth } = require('../../middleware/auth');
const ctrl = require('./groups.ctrl');

router.post('/create', auth, ctrl.process.create);
router.post('/approve', auth, ctrl.process.approve);
router.post('/search', ctrl.process.search);
router.post('/tagging', ctrl.process.tagging);
router.post('/waiting', auth, ctrl.process.waiting);
router.post('/profile', ctrl.process.profile);

module.exports = router;
