const express = require('express');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();
const { auth } = require('../../middleware/auth');
const ctrl = require('./groups.ctrl');

router.get('/download/image/:id', ctrl.get.image);
router.get('/download/background/:id', ctrl.get.background);
router.post('/upload/image', upload.single('image'), ctrl.post.image);
router.post('/upload/background', upload.single('image'), ctrl.post.background);

router.post('/create', auth, ctrl.post.create);
router.post('/approve', auth, ctrl.post.approve);
router.post('/join', auth, ctrl.post.join);
router.post('/profile', ctrl.post.profile);
router.post('/edit', auth, ctrl.post.edit);

module.exports = router;
