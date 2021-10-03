const express = require('express');

const router = express.Router();
const checkLoggedin = require('../../middleware/checkLoggedin');

const ctrl = require('./groups.ctrl');

router.get('/info', checkLoggedin, ctrl.output.info);

router.post('/create', ctrl.process.create);
router.post('/join', ctrl.process.join);
router.post('/search', ctrl.process.search);

module.exports = router;
