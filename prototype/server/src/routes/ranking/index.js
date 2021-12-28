const express = require('express');

const router = express.Router();

const ctrl = require('./ranking.ctrl');

router.get('/user', ctrl.output.user);
router.get('/group', ctrl.output.group);
router.get('/tag', ctrl.output.tag);

module.exports = router;
