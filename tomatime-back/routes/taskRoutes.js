const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskControllers.js");

router.get("/", controller.getTask);
router.post("/", controller.addTask);

module.exports = router;
