const express = require('express');

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./board.ctrl');

router.post('/group', ctrl.post.getGroupBoards);
router.post('/user', ctrl.post.getUserBoards);
router.post('/save', auth, ctrl.post.saveBoard);
router.post('/edit', auth, ctrl.post.editBoard);
router.post('/remove', auth, ctrl.post.removeBoard);

module.exports = router;
