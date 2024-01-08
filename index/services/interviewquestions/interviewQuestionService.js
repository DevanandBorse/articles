// All related to database connection
const Pool = require('../../../database');

const InterviewQuestion = {
  // Create interview question
    create: async (title, author, content, category, subcategory, tags, status, created_on, uid) => {
      try {
        const interviewQuestion = await Pool.query(
          "INSERT INTO interview_questions(title, author, content, category, subcategory, tags, status, created_on, uid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
          [title, author, content, category, subcategory, tags, status, created_on, uid]
        );
        return interviewQuestion.rows[0];
      } catch (error) {
        console.error(error.message);
      }
    },

insertImage: async (interviewId, imagePath, status) => {
  try {
    const interviewImages = await Pool.query(
      `INSERT INTO interview_questions_images (interview_questions_id, path, status) VALUES ($1, $2, $3)`, 
      [interviewId, imagePath, status]
    );
    return interviewImages;
  } catch (error) {
    throw new Error(`Error in inserting interview image: ${error.message}`);
  }
},


    // Get all interview questions whose status is 1
    getAll: async () => {
      try {
        const interviewQuestions = await Pool.query(
          "SELECT id,title,author,content,category,subcategory,tags,status,created_on,uid FROM interview_questions where status = 1"
        );
        return interviewQuestions.rows;
      } catch (error) {
        console.error(error.message);
      }
    },

    getById: async (id) => {
      try {
        const interviewQuestion = await Pool.query(
          "SELECT a.id, a.title, a.author, a.content, a.category, a.subcategory, a.tags, a.status, (SELECT c.category_name FROM interview_questions_main_category as c WHERE c.id = a.category) as category, (SELECT c.category_name FROM interview_questions_sub_category as c WHERE c.id = a.subcategory) as subcategory, a.created_on, i.path AS image_path FROM interview_questions as a LEFT JOIN interview_questions_images AS i ON a.id = i.interview_questions_id WHERE a.id = $1 AND a.status = 1",
          [id]
        );
        return interviewQuestion.rows;
      } catch (error) {
        console.error(error.message);
      }
    },
    

    // Get interview questions using pagination
    getPagination: async (maincatid, subcatid, offset, limit) => {
      try{
        const interviewQuestions = await Pool.query(
          "SELECT a.id,a.title,a.author,a.category,a.subcategory,a.tags,a.status,(SELECT c.category_name FROM interview_questions_main_category as c WHERE c.id = a.category) as category,(SELECT c.category_name FROM interview_questions_sub_category as c WHERE c.id = a.subcategory) as subcategory,a.created_on FROM interview_questions as a WHERE a.category = $1 AND a.subcategory = $2 ORDER BY id DESC OFFSET $3 LIMIT $4 ", [maincatid, subcatid, offset, limit]
        );
        return interviewQuestions.rows;
      } catch(error){
        console.error(error.message);
      }
    },

    update: async (id, title, author, content, category, subcategory, tags, status, created_on, uid) => {
      try{
        const interviewQuestions = await Pool.query(
          "UPDATE interview_questions SET title=$1, author=$2, content=$3, category=$4, subcategory=$5, tags=$6, created_on=$7 WHERE id=$8 RETURNING *",
        [title, author, content, category, subcategory, tags, created_on, id]
        );
        return interviewQuestions.rows;
      } catch (error) {
        console.error(error.message);
      }
    },

    search: async (title, res) => {
      try{
        var status = 1;
        const interviewQuestions = await Pool.query(
      `SELECT 
      a.id, a.title, a.author, a.content, a.category, a.subcategory, a.tags, a.status,
      (SELECT c.category_name FROM interview_questions_main_category as c WHERE c.id = a.category) as category,
      (SELECT c.category_name FROM interview_questions_sub_category as c WHERE c.id = a.subcategory) as subcategory,
      a.created_on, img.path as image_path  -- Include image path in selection FROM 
      interview_questions as a
      INNER JOIN 
      interview_questions_main_category as iqmain ON iqmain.id = a.category 
      INNER JOIN 
      interview_questions_sub_category as iqsub ON iqsub.id = a.subcategory  
      LEFT JOIN 
      interview_questions_images as img ON img.interview_questions_id = a.id  -- Join with images table
      WHERE 
      a.status = 1 AND (
          a.title LIKE '%${title}%' 
          OR iqmain.category_name LIKE '%${title}%' 
          OR iqsub.category_name LIKE '%${title}%'
          OR img.path LIKE '%${title}%'  -- Include image path in search criteria
      )`
        );
        return interviewQuestions.rows;
      } catch (error) {
        console.error(error.message);
      }
    }, 

    delete: async (id) => {
      try {
        const interviewQuestion = await Pool.query(
          `UPDATE "interview_questions" SET "status" = 0 WHERE "id" = $1 AND status = 1`, [id]
        );
        // console.log(interviewQuestion);
        return interviewQuestion;
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  module.exports = InterviewQuestion;