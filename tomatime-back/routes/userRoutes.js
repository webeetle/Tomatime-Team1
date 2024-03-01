const express = require("express");
const router = express.Router();
const controller = require("../controllers/userControllers.js");


router.get('/', controller.getUserList);
router.post('/login', controller.login);
router.post('/register', controller.registration);




module.exports = router;