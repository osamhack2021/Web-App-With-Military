const express = require('express');

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./board.ctrl');

router.get('/', ctrl.output.all);

router.post('/write', auth, ctrl.process.write);
router.post('/edit', auth, ctrl.process.edit);
router.post('/remove', auth, ctrl.process.remove);
router.post('/comment/write', auth, ctrl.process.commentWrite);
router.post('/comment/remove', auth, ctrl.process.commentRemove);

router.post('/user', ctrl.process.user);
router.post('/group', ctrl.process.group);
router.post('/comment/read', ctrl.process.read);

module.exports = router;
