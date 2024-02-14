const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskControllers.js");

router.get('/', controller.getTasks);
router.get('/:id', controller.getTask);

router.post('/', controller.addTask);

router.put('/:id', controller.moveTask);

module.exports = router;
