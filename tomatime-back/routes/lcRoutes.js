const express = require("express");
const router = express.Router();
const controller = require("../controllers/lcControllers.js");

router.get('/:id', controller.getLC);
router.get('/next/:id', controller.getNextStep);

module.exports = router;