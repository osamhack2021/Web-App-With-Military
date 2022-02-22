const express = require('express');

const router = express.Router();

const ctrl = require('./ranking.ctrl');

router.get('/user', ctrl.get.user);
router.get('/group', ctrl.get.group);
router.get('/user/update', ctrl.get.userUpdate);
router.get('/group/update', ctrl.get.groupUpdate);

module.exports = router;
