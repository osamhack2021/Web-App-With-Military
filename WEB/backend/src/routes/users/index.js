"use strict";

const express = require("express");
const router = express.Router();

const { auth } = require('./../../middleware/auth')

const ctrl = require("./users.ctrl");

router.get("/auth", auth, ctrl.output.auth);
router.get("/logout", auth, ctrl.output.logout);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;
