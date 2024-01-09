const LoginModel = require("../../model/login/loginModel");

const loginController = {
  UserLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email);
      if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
      }

      const result = await LoginModel.loginUser(email, password);

      return res.status(200).json({
        response_code: 200,
        response_message: "Login successful",
        token: result.token,
      });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = loginController;
