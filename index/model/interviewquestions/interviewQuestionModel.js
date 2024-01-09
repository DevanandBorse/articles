const InterviewQuestion = require('../../services/interviewquestions/interviewQuestionService');

const InterviewQuestionModel = {
  createInterviewQuestion: async (reqBody) => {
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
    } = reqBody;

    try {
      const newInterviewQuestion = await InterviewQuestion.create(
        title,
        author,
        content,
        category,
        subcategory,
        tags,
        status,
        created_on,
        uid
      );
      return newInterviewQuestion;
    } catch (error) {
      console.error(error);
    }
  },

  insertInterviewImage: async (interviewId, imagePath, status) => {
    try {
        const interviewImages = await InterviewQuestion.insertImage(interviewId, imagePath, status);
        return interviewImages;
    } catch (error) {
        console.error(error.message);
    }
},

  getInterviewQuestions: async () => {
    try{
      const interviewquestion = await InterviewQuestion.getAll();
      return interviewquestion;
    } catch (error) {
      console.error(error.message);
    }
  },

  getInterviewQuestionById: async (id) => {
    try {
      const interviewquestion = await InterviewQuestion.getById(id);
      return interviewquestion;
    } catch (error) {
      console.error(error.message);
    }
  },

  getInterviewQuestionsByPagination: async (maincatids, subcatid, offset, limit) => {
    try{
      var maincatid = maincatids;
      var subcatid = subcatid;
      var offset = offset;
      var limit = limit;
      // console.log("Limit = "+limit);
      const getInterviewQuestionsByPagination = await InterviewQuestion.getPagination(maincatid, subcatid, offset, limit);
      return getInterviewQuestionsByPagination;
    } catch (error) {
      console.error(error.message);
    }
  },

  updateInterviewQuestion: async (id, reqBody) => {
    const {
      title,
      author,
      content,
      category,
      subcategory,
      tags,
      status,
      created_on,
      uid
    } = reqBody;

    try{
      const updateInterviewQuestion = await InterviewQuestion.update(
        id,
        title,
        author,
        content,
        category,
        subcategory,
        tags,
        status,
        created_on,
        uid
        );
        return updateInterviewQuestion;
    } catch (error) {
      console.error(error.message);
    }
  },

  searchInterviewQuestion: async (reqQuery, res) => {
    try{
      var title = reqQuery.title === undefined ? null : reqQuery.title != "null" ? reqQuery.title : null;

      const searchInterviewQuestion = await InterviewQuestion.search(title, res);
      return searchInterviewQuestion;
    } catch (error) {
      console.error(error.message);
    }
  },

  deleteInterviewQuestion: async (reqParams, res) => {
    try {
      const id = reqParams.id;
      const deleteInterviewQuestion = await InterviewQuestion.delete(id);
      return deleteInterviewQuestion;

    } catch (error) {
      console.error(error.message);
    }
  }
};

module.exports = InterviewQuestionModel;