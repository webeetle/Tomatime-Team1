const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskControllers.js");


router.get('/', controller.getTask);


module.exports = router;
