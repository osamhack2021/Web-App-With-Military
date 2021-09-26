"use strict";

const express = require("express");
const router = express.Router();
const { auth } = require('./../../middleware/auth');    
const ctrl = require("./groups.ctrl");

router.get("/info", auth, ctrl.output.info);
router.post("/create", ctrl.process.create);
router.post("/register", ctrl.process.register);

module.exports = router;
