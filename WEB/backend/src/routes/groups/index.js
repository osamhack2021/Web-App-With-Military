"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./groups.ctrl");

router.post("/create", ctrl.process.create);

module.exports = router;
