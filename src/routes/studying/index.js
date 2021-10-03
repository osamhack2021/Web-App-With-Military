const express = require('express');

const router = express.Router();

const checkLoggedin = require('../../middleware/checkLoggedin');

const ctrl = require('./studying.ctrl');

router.get('/', checkLoggedin, ctrl.output.status);
router.get('/start', checkLoggedin, ctrl.output.start);
router.get('/end', checkLoggedin, ctrl.output.end);

module.exports = router;
