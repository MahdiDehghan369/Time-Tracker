const express = require('express');
const router = express.Router()

const authMiddleware = require('./../../middlewares/auth');
const reportCtrl = require('./report.ctrl');

router.route("/").get(authMiddleware, reportCtrl.getWeeklyReport);
router.route("/daily").get(authMiddleware, reportCtrl.getDailyReport);

module.exports = router