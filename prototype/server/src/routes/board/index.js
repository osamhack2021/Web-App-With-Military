const express = require('express');

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./board.ctrl');

router.get('/', ctrl.get.all);

router.post('/write', auth, ctrl.post.write);
router.post('/edit', auth, ctrl.post.edit);
router.post('/remove', auth, ctrl.post.remove);
router.post('/comment/write', auth, ctrl.post.commentWrite);
router.post('/comment/remove', auth, ctrl.post.commentRemove);

router.post('/user', ctrl.post.user);
router.post('/group', ctrl.post.group);
router.post('/comment/read', ctrl.post.read);

module.exports = router;
