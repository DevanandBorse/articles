const express = require("express");
const loginController = require("../../controller/login/loginController");

const router = express.Router();

//api for login
router.post("/login", loginController.UserLogin);

module.exports = router;
