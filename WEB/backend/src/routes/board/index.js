const express = require('express');

const router = express.Router();

const ctrl = require('./board.ctrl');

router.post('/', ctrl.output.all);
router.post('/write', ctrl.process.write);
router.post('/edit', ctrl.process.edit);

module.exports = router;
