const express = require('express');
<<<<<<< HEAD
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.raw());
// Other configurations and middleware setups...

// Importing interview question routes
const interviewQuestionRoute = require('./index/routes/interviewquestions/interviewQuestionRoute');
app.use('/apis', interviewQuestionRoute);

// Importing interview question main category routes
const iqMainCategoryRoute = require('./index/routes/interviewquestions/iqMainCategoryRoute');
app.use('/apis', iqMainCategoryRoute);

// Importing interview question sub category routes
const iqSubCategoryRoute = require('./index/routes/interviewquestions/iqSubCategoryRoute');
app.use('/apis', iqSubCategoryRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
=======
const bodyParser = require('body-parser');
const articleCategoriesRoutes=require('./index/routes/articlcategories/articleCategoriesRoutes');
const createArticleRoutes=require('./index/routes/articles/createArticleRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();




const PORT = process.env.PORT || 3000;
const pool = require('./index/database')


app.use(bodyParser.json());
app.use(cors());
app.use('/apis',articleCategoriesRoutes);
app.use('/apis',createArticleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

>>>>>>> d769b579ab3d83e5e16e934aaca49e940e3993af
