const express = require('express');

const router = express.Router();

const ctrl = require('./ranking.ctrl');

router.get('/user', ctrl.get.user);
router.get('/group', ctrl.get.group);
router.get('/update', ctrl.get.update);

module.exports = router;
