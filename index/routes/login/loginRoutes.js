const express = require('express');
//const userController = require('../controllers/userController');
const loginController = require("../../controller/login/loginController");

const router = express.Router();

router.post('/login', loginController.UserLogin);

module.exports = router;
