const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.raw());

const cors = require("cors");
app.use(cors());


const dotenv = require("dotenv");
dotenv.config();

//Importing user routes
const userRoutes = require("./index/routes/users/userRoutes");

//Importing login routes
const loginRoutes = require("./index/routes/login/loginRoutes");

// Importing interview question routes
const interviewQuestionRoute = require("./index/routes/interviewquestions/interviewQuestionRoute");

// Importing interview question main category routes
const iqMainCategoryRoute = require("./index/routes/interviewquestions/iqMainCategoryRoute");

// Importing interview question sub category routes
const iqSubCategoryRoute = require("./index/routes/interviewquestions/iqSubCategoryRoute");

//Importing article category routes
const articleCategoriesRoutes = require("./index/routes/articlecategories/articleCategoriesRoutes");

//Importing article routes
const createArticleRoutes = require("./index/routes/articles/createArticleRoutes");

// Routes
app.use("/apis", userRoutes);
app.use("/apis", loginRoutes);
app.use("/apis", iqSubCategoryRoute);
app.use("/apis", iqMainCategoryRoute);
app.use("/apis", interviewQuestionRoute);
app.use("/apis", articleCategoriesRoutes);
app.use("/apis", createArticleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


