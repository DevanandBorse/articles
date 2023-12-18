const express = require('express');
const router = express.Router()

// const interviewQuestionController = require('../controllers/interviewQuestionController');
const  interviewQuestionController=require('../controllers/interviewquestionController');


router.post('/insertInterviewQuestion',interviewQuestionController.createInterviewQuestion);
router.get('/getInterviewQuestions', interviewQuestionController.getInterviewQuestions);


module.exports = router;