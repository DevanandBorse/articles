const express = require('express');
const bodyParser = require('body-parser');
const articleRoutes = require('./index/routes/articleRoutes');
// const interviewQuestionRoutes = require('./routes/interviewQuestionRoutes');
const interviewQuestionRoutes = require("./index/routes/interviewquestionRoutes");
const iqMaincategoryRoutes = require("./index/routes/iqMaincategoryRoutes");
const interviewQuestionRoutes=require("./index/routes/interviewquestionRoutes");
const categoryRoutes=require('./index/routes/categoryRoutes');
const iqsubcategoryController=require('./index/routes/iqsubcategoryRoutes');


const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./index/database')

//pool();

app.use(bodyParser.json());

app.use('/apis', articleRoutes);
app.use('/apis', interviewQuestionRoutes);
<<<<<<< HEAD
app.use('/apis', iqMaincategoryRoutes);
=======
app.use('/apis',categoryRoutes);
app.use('/apis',iqsubcategoryController);
>>>>>>> 93d7f45ff08631a1cbed9633bca38db0b65143b3

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

