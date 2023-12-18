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
      const interview_questions = await Pool.query(
        "INSERT INTO interview_questions(title, author, content, category, subcategory, tags, status, created_on, uid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
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

      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: interview_questions.rows[0],
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  //get Interview question
  getInterviewQuestions: async (req, res) => {
    try {
      const interview_questions = await Pool.query(
        "SELECT id,title,author,content,category,subcategory,tags,status,created_on,uid FROM interview_questions"
      );
      if (interview_questions.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Interview Question not found" });
      }
      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: interview_questions.rows
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  // get interview questions by Id
  getInterviewQuestionById: async (req, res) => {
    try {
      const { id } = req.params;
      const interview_questions = await Pool.query(
        "SELECT title,author,content,category,subcategory,tags,status,created_on,uid FROM interview_questions WHERE id=$1",
        [id]
      );

      if (interview_questions.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Interview question not found" });
      }
      res.json({
        response_code: 200,
        response_message: "Success",
        data: interview_questions.rows[0]
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  //update interview question by Id
  updateInterviewQuestionById: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        author,
        content,
        category,
        subcategory,
        tags,
        created_on,
      } = req.body;
      const interview_questions = await Pool.query(
        "UPDATE interview_questions SET title=$1, author=$2, content=$3, category=$4, subcategory=$5, tags=$6, created_on=$7 WHERE id=$8 RETURNING *",
        [title, author, content, category, subcategory, tags, created_on, id]
      );

      if (interview_questions.rows.length === 0) {
        return res.status(404).json({ message: "Id not found" });
      }
      return res.json({
        response_code: 200,
        response_message: "Interview Question updated successfully",
        data: interview_questions.rows[0]
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  //delete interview question by id
  deleteInterviewQuestionById: async (req, res) => {
    try {
      const { id } = req.params;
      const interview_questions = await Pool.query(
        "DELETE FROM interview_questions WHERE id=$1 RETURNING *",
        [id]
      );

      if (!interview_questions) {
        return res.status(404).json({ error: "Interview question not found" });
      }
      res.json({ 
        response_code: 200,
        response_message: "Success" 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
