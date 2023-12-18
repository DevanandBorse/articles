const express = require('express');
const router = express.Router()

// const interviewQuestionController = require('../controllers/interviewQuestionController');
const  interviewQuestionController=require('../controllers/interviewquestionController');


router.post('/apis/insertInterviewQuestion',interviewQuestionController.createInterviewQuestion);
router.get('apis/getInterviewQuestions', interviewQuestionController.getInterviewQuestions);


module.exports = router;