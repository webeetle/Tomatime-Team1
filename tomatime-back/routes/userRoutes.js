const express = require("express");
const router = express.Router();
const controller = require("../controllers/userControllers.js");


router.post('/register', controller.registration);


module.exports = router;