const express = require('express');

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./comment.ctrl');

router.post('/', ctrl.post.getComments);
router.post('/save', auth, ctrl.post.saveComment);
router.post('/remove', auth, ctrl.post.removeComment);

module.exports = router;
