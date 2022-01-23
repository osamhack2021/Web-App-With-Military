const express = require('express');

const router = express.Router();
const { auth } = require('../../middleware/auth');
const ctrl = require('./groups.ctrl');

router.post('/create', auth, ctrl.post.create);
router.post('/approve', auth, ctrl.post.approve);
router.post('/join', auth, ctrl.post.join);
router.post('/profile', ctrl.post.profile);
router.post('/edit', auth, ctrl.post.edit);

module.exports = router;
