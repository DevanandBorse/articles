const express = require('express');
//const userController = require('../controllers/userController');
//const verifyToken = require('../middleware/verifyToken');
//const userController= require("../../controller/users/userController");
const verifyToken=require("../../middleware/verifytoken");

//const userController = require('../../controller/users/userController');
const userController=require("../../controller/users/userController");


const router = express.Router();

router.post('/users',  userController.createUser);
router.get('/users', verifyToken, userController.getAllUsers);
router.get('/users/:id',verifyToken,userController.getUsersById);
router.put('/users/:id',verifyToken,userController.updateUserById);
router.delete('/users/:id',verifyToken,userController.deleteUserById);

module.exports = router;
