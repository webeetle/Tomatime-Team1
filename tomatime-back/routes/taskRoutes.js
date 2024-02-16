const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskControllers.js");

router.get('/:id', controller.getTasks);
router.get('/single/:id', controller.getTask);

router.post('/', controller.addTask);

router.put('/move/:id', controller.moveTask);
router.put('/:id', controller.editTask);

router.delete('/:id', controller.deleteTask);

module.exports = router;
