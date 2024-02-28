const express = require("express");
const router = express.Router();
const controller = require("../controllers/timerController.js");

router.get("/:id", controller.getTimer);
router.get("/time/:id", controller.getRemainingTime);
router.post(`/:id`, controller.startTimer);
router.put("/:id", controller.stopTimer);
router.put(`/complete/:id`, controller.completeTimer);
module.exports = router;
