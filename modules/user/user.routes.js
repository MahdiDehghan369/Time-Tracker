const express = require('express');
const router = express.Router()

const authMiddleware = require('./../../middlewares/auth');
const userCtrl = require('./user.ctrl');

router.route("/").get(authMiddleware , userCtrl.getAllUsers)

module.exports = router