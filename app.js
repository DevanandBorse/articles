const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.raw());

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');

const userRoutes = require('./index/routes/users/userRoutes');
const loginRoutes=require("./index/routes/login/loginRoutes");
dotenv.config();

// Initialize database connection
// const db = require('./database');
// db.connect();

// Routes
app.use('/apis',userRoutes);
app.use('/apis',loginRoutes);
app.use("/apis",userRoutes);
app.use('/apis',userRoutes);
app.use('/apis',userRoutes);
app.use('/apis',userRoutes);

// Importing interview question routes
const interviewQuestionRoute = require('./index/routes/interviewquestions/interviewQuestionRoute');
app.use('/apis', interviewQuestionRoute);

// Importing interview question main category routes
const iqMainCategoryRoute = require('./index/routes/interviewquestions/iqMainCategoryRoute');
app.use('/apis', iqMainCategoryRoute);

// Importing interview question sub category routes
const iqSubCategoryRoute = require('./index/routes/interviewquestions/iqSubCategoryRoute');
app.use('/apis', iqSubCategoryRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const articleCategoriesRoutes=require('./index/routes/articlecategories/articleCategoriesRoutes');
const createArticleRoutes=require('./index/routes/articles/createArticleRoutes');

app.use('/apis',articleCategoriesRoutes);
app.use('/apis',createArticleRoutes);