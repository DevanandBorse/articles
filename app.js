const express = require('express');
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

