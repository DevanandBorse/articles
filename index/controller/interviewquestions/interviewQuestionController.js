const InterviewQuestionModel = require("../../model/interviewquestions/interviewQuestionModel");

const InterviewQuestionController = {
  // Pass parameters from req.body to create new interview question
  createInterviewQuestion: async (req, res) => {
    try {
      const status = 1;
      // Default to null if no image is provided
      var imgPath = null;
      if (req.file && req.file.path) {
        imgPath = req.file.path;
      }

      const interviewquestion =
        await InterviewQuestionModel.createInterviewQuestion(req.body);

      var interviewQuestionId = interviewquestion.id;
      console.log(interviewQuestionId);

      if (imgPath) {
        // If imagePath is not null, insert the image
        const insertImage = await InterviewQuestionModel.insertInterviewImage(
          interviewQuestionId,
          imgPath,
          status
        );
      }

      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: interviewquestion,
      });
    } catch (error) {
      console.error(error.message);
      
      res.status(500).send("Server Error");
    }
  },

  // get all interview questions
  getInterviewQuestions: async (req, res) => {
    try {
      const interviewquestion =
        await InterviewQuestionModel.getInterviewQuestions();
      if (interviewquestion.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Interview questions not found" },
        });
      }

      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: interviewquestion,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  // get interview question by id
  getInterviewQuestionById: async (req, res) => {
    try {
      var id = parseInt(req.params.id);
      const interviewquestion =
        await InterviewQuestionModel.getInterviewQuestionById(id);
      if (interviewquestion.length == 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Id not found" },
        });
      }

      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: interviewquestion,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  // get interview questions through pagination
  getInterviewQuestionsByPagination: async (req, res) => {
    try{
      var pageno = parseInt(req.params.pageno);
      var limit = parseInt(req.params.limit);
      var maincatid = parseInt(req.params.maincatid);
      var subcatid = parseInt(req.params.subcatid);
      var offset = (pageno - 1) * limit;

      const interviewquestion =
        await InterviewQuestionModel.getInterviewQuestionsByPagination(
          maincatid,
          subcatid,
          offset,
          limit
        );

      if (interviewquestion.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Interview question not found" }
        });
      }
      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: interviewquestion,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  // Update Interview Question
  updateInterviewQuestion: async (req, res) => {
    try {
      var id = parseInt(req.params.id);
      const interviewquestion =
        await InterviewQuestionModel.updateInterviewQuestion(id, req.body);
      if (interviewquestion.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Id not found" },
        });
      }
      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: { message: "Interview question updated successfully" },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  // Search interview question on the basis of title
  searchInterviewQuestion: async (req, res) => {
    try {
      const interviewquestion =
        await InterviewQuestionModel.searchInterviewQuestion(req.query, res);
      console.log("interviewquestion = " + interviewquestion);
      if (interviewquestion.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message:"Data not found" }
        });
      }
      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: interviewquestion,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  // delete interview question
  deleteInterviewQuestion: async (req, res) => {
    try {
      const interviewquestion =
        await InterviewQuestionModel.deleteInterviewQuestion(req.params, res);
      if (interviewquestion.rowCount === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Id not found!!" },
        });
      }

      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: { message: "Interview question deleted successfully" },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = InterviewQuestionController;
