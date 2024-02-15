const express = require("express");
const router = express.Router();
const controller = require("../controllers/lcControllers.js");

router.get('/', controller.getLC);
router.get('/next/:id', controller.getNextStep);

module.exports = router;