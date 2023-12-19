const express = require('express');
const router = express.Router()

const interviewquestionController = require('../controllers/interviewquestionController');


router.post('/interviewquestions',interviewquestionController.createInterviewQuestion);
router.get('/interviewquestions', interviewquestionController.getInterviewQuestions);
router.get('/interviewquestions/:id',interviewquestionController.getInterviewQuestionById);
router.put('/interviewquestions/:id',interviewquestionController.updateInterviewQuestionById);
router.delete('/interviewquestions/:id',interviewquestionController.deleteInterviewQuestionById);



module.exports = router;