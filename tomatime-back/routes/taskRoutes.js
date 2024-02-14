const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskControllers.js");

router.get('/', controller.getTasks);
router.get('/:id', controller.getTask);

router.post('/', controller.addTask);

router.put('/move/:id', controller.moveTask);
router.put('/:id', controller.editTask);

router.delete('/:id', controller.deleteTask);

module.exports = router;
