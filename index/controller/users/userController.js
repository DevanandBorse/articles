const usersModel = require("../../model/users/usersModel");

const userController = {
  //insert user
  createUser: async (req, res) => {
    try {
      const user = await usersModel.createUser(req.body);
      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: user,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  //get all users
  getAllUsers: async (req, res) => {
    try {
      const user = await usersModel.getUsers();
      if (user.length === 0) {
        res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "User not found" },
        });
      }
      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: user,
      });
    } catch (err) {
      console.error(err);
      return res.status(404).json({ message: err.message });
    }
  },

  //get all user by id
  getUsersById: async (req, res) => {
    try {
      var id = req.params.id;
      const user = await usersModel.getUsersById(id);
      if (user.length === 0) {
        res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "User Id not found" },
        });
      }
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: user,
      });
    } catch (err) {
      console.error(err);
      return res.status(404).json({ message: err.message });
    }
  },

  //update user by id
  updateUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usersModel.updateUserById(id, req.body);

      if (user.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "User Id not found" },
        });
      }
      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: { message: "User data updated successfully" },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  //delete user by id
  deleteUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await usersModel.deleteUserById(id);

      if (users.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "User Id not found" },
        });
      }
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: { message: "User data deleted successfully" },
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = userController;
