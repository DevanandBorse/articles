const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./database');
//const userRoutes = require('./routes/userRoutes');
//const userRoutes=require("./index/routes/users/userRoutes");
//const userRoutes=require("../../index/routes/users/userRoutes");
const userRoutes = require('./index/routes/users/userRoutes');
const loginRoutes=require("./index/routes/login/loginRoutes");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Initialize database connection
db.connect();

// Routes
app.use('/apis',userRoutes);
app.use('/apis',loginRoutes);
app.use("/apis",userRoutes);
app.use('/apis',userRoutes);
app.use('/apis',userRoutes);
app.use('/apis',userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
