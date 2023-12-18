const express = require('express');
const bodyParser = require('body-parser');
const articleRoutes = require('./index/routes/articleRoutes');
// const interviewQuestionRoutes = require('./routes/interviewQuestionRoutes');
const interviewQuestionRoutes=require("./index/routes/interviewquestionRoutes");
const categoryRoutes=require('./index/routes/categoryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./index/database')

//pool();

app.use(bodyParser.json());

app.use('/apis', articleRoutes);
app.use('/apis', interviewQuestionRoutes);
app.use('/apis',categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

