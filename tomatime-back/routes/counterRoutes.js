const express = require("express");
const router = express.Router();
const controller = require("../controllers/counterController.js");

router.get("/:id", controller.getCounters);  


module.exports = router;