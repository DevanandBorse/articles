//const userModel = require('../models/userModel');
//const loginModels=require("../../models/login/loginModels");
//const LoginService = require('../../service/login/loginService');
const LoginService=require("../../../index/services/login/loginService");
const jwt = require('jsonwebtoken');

const generateAuthToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'your-secret-key', { expiresIn: '24h' }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

const LoginModel = {


loginUser: async (email, password) => {
  const user = await LoginService.getUserByEmailAndPassword(email, password);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const payload = {
    user: {
      userId: user.id,
    },
  };

  const token = await generateAuthToken(payload);

  return { token };
}
}
module.exports = LoginModel;