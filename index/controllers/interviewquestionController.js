//const InterviewQuestion = require('../models/interviewQuestion');
// const InterviewQuestion=require("../models/interviewquestion");
const Pool = require("../database");
module.exports = {
  createInterviewQuestion: async (req, res) => {
    try {
      const {
        title,
        author,
        content,
        category,
        subcategory,
        tags,
        status,
        created_on,
        uid,
      } = req.body;
  
      // Execute the query using the established pool
      const interview_question = await Pool.query(
        "INSERT INTO interview_questions(title,author,content,category,subcategory,tags,status,created_on,uid) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
        [
          title,
          author,
          content,
          category,
          subcategory,
          tags,
          status,
          created_on,
          uid,
        ]
      );
  
      res.json(interview_question.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },
  
  

  //get Interview question
  getInterviewQuestions: async (req, res) => {
    try {
      const interviewQuestions = await Pool.query(
        "SELECT * FROM interview_questions"
      );
      if (interviewQuestions.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Interview Question not found" });
      }
      res.json(interviewQuestions.rows);
    } catch (err) {
      console.log(err);
      res.status(500).send("server Error");
    }
  },

    getInterviewQuestionById: async (req, res) => {
      try {
        const { id } = req.params;
        const interviewQuestion = await InterviewQuestion.findByPk(id);
        if (!interviewQuestion) {
          return res.status(404).json({ error: 'Interview question not found' });
        }
        res.json(interviewQuestion);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    updateInterviewQuestion: async (req, res) => {
      try {
        const { id } = req.params;
        const {title,author,content,category,subcategory,tags,status } = req.body;
        const interviewQuestion = await InterviewQuestion.findByPk(id);
        if (!interviewQuestion) {
          return res.status(404).json({ error: 'Interview question not found' });
        }
        await interviewQuestion.update({ id,title,author,content,category,subcategory,tags,status });
        res.json({ message:'Interview Question updated successfully'});

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },

    deleteInterviewQuestion: async (req, res) => {
      try {
        const { id } = req.params;
        const {title,author,content,category,subcategory,tags,status } = req.body;
        const interviewQuestion = await InterviewQuestion.findByPk(id);
        if (!interviewQuestion) {
          return res.status(404).json({ error: 'Interview question not found' });
        }
        await interviewQuestion.destroy();
        res.json({ message: 'Interview question deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
};
