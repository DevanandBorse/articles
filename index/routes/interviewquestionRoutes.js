const express = require('express');
const router = express.Router()
// const interviewQuestionController = require('../controllers/interviewQuestionController');
const  interviewQuestionController=require('../controllers/interviewquestionController');

router.post("/interviewQuestions",interviewQuestionController.createInterviewQuestion);
router.get('/interviewQuestions', interviewQuestionController.getInterviewQuestions);
router.get("/interviewQuestions/:id",interviewQuestionController.getInterviewQuestionById);
router.put('/interviewQuestions/:id',interviewQuestionController.updateInterviewQuestionById);
router.delete('/interviewQuestions/:id',interviewQuestionController.deleteInterviewQuestionById);

module.exports = router;