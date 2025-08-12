const express = require('express');
const router = express.Router()

const timeEntryCtrl = require('./timeEntry.ctrl');
const authMiddleware = require('./../../middlewares/auth');

router.route("/").get(authMiddleware , timeEntryCtrl.getMyTimes)
router
  .route("/set-manual")
  .post(authMiddleware, timeEntryCtrl.setManualTime);
router.route("/start").post(authMiddleware , timeEntryCtrl.startTime)
router.route("/:timeId/stop").post(authMiddleware , timeEntryCtrl.stopTime)
router.route("/:userId").get(authMiddleware, timeEntryCtrl.getUsersTimes);
router.route("/:timeId").delete(authMiddleware , timeEntryCtrl.removeTime).put(authMiddleware , timeEntryCtrl.editTime)

module.exports = router