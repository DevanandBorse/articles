//const userModel = require('../models/userModel');
//const { Error } = require("sequelize");
//const userModel=require("../../models/users/userModels");
//const usersModel=require("../../model/users/usersModel");
const userService=require("../../service/users/userService");

const userModel={
//Insert user
  createUser: async (reqBody) => {
    const {
      name,
      password,
      email,
      address,
      mobile_number,
      status,
      created_on
    } = reqBody;
    console.log(name);

    try{
      const newuser=await userService.createUser(
      name,
      password,
      email,
      address,
      mobile_number,
      status,
      created_on
      );
      return newuser;
    } catch(error){
      console.error(error);
    }
    },


//get all users
getUsers : async () => {
    const users = await userService.getAll();
    if (users.length === 0) {
      throw new Error('Users not found');
    }
    return users;
  },

//get user by id
 getUsersById:async(id)=>{
    const users=await userService.getUsersById(id);
    if(users.length===0){
        throw new Error('User Id not found'); 
    }
    return users;
},
 updateUserById : async (id, userData) => {
    const updatedUser = await userService.updateUserById(id, userData);
    if (!updatedUser) {
      throw new Error('User Id not found');
    }
    return updatedUser;
  },
   deleteUserById : async (id) => {
    const deletedUser = await userService.deleteUserById(id);
    if (deletedUser.length === 0) {
      throw new Error('User Id not found');
    }
    return deletedUser;
  },
};

module.exports = userModel;