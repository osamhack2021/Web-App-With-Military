const express = require('express');

const router = express.Router();

const ctrl = require('./search.ctrl');

router.post('/all', ctrl.post.all);

module.exports = router;
