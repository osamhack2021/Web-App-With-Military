const express = require('express');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();

const { auth } = require('../../middleware/auth');

const ctrl = require('./users.ctrl');

router.get('/download/image/:id', ctrl.get.image);
router.get('/download/background/:id', ctrl.get.background);
router.post('/upload/image', upload.single('image'), ctrl.post.image);
router.post('/upload/background', upload.single('image'), ctrl.post.background);

router.get('/auth', auth, ctrl.get.auth);
router.get('/logout', auth, ctrl.get.logout);

router.post('/login', ctrl.post.login);
router.post('/register', ctrl.post.register);
router.post('/profile', ctrl.post.profile);
router.post('/edit', auth, ctrl.post.edit);

module.exports = router;
