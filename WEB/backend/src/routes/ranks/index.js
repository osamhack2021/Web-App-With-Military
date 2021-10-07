const express = require('express');

const router = express.Router();

const ctrl = require('./ranks.ctrl');

router.get('/total-time', ctrl.output.totalTime);

module.exports = router;
