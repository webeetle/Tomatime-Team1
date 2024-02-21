const express = require("express");
const router = express.Router();
const controller = require("../controllers/timerController.js");

router.get("/:id", controller.getRemainingTime);

module.exports = router;
