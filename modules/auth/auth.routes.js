const express = require('express');
const router = express.Router()

const authCtrl = require('./auth.ctrl');
const authMiddleware = require('../../middlewares/auth');

router.route("/login").post(authCtrl.login)
router.route("/register").post(authCtrl.register)
router.route("/me").get(authMiddleware , authCtrl.getMe);

module.exports = router