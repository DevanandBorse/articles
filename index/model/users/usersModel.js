
const userService=require("../../../index/services/users/userService");
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
  try {
    const users = await userService.getAll();
    return users;
  } catch (error) {
    console.error(error.message);
  }
    
  },

//get user by id
 getUsersById:async(id)=>{
  try {
    const users=await userService.getUsersById(id);
    return users;
  } catch (error) {
    console.error(error.message);
  }
    
},
//update user by id
 updateUserById : async (id, userData) => {
  try {
    const updatedUser = await userService.updateUserById(id, userData);
    return updatedUser;
  } catch (error) {
    console.error(error.message);
  }
  },
//delete user by id
   deleteUserById : async (id) => {
    try {
      const deletedUser = await userService.deleteUserById(id);
    return deletedUser;
    } catch (error) {
    console.error(error.message);
    }
    
  },
};

module.exports = userModel;