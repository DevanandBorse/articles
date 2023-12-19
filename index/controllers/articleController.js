const Pool = require('../database');
// const Article = require('../models/article');

module.exports = {
  createArticle: async (req, res) => {
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
      const article = await Pool.query(
        'INSERT INTO articles(title,author,content,category,subcategory,tags,status,created_on,uid) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
        [ title, author, content, category, subcategory, tags, status, created_on, uid]
      ) ; 
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        Data: article.rows[0]
      });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  //get All articles 
  getAllArticles: async (req, res) => {
    try {
      const article = await Pool.query(
       
        "SELECT id,title,author,content,category,subcategory,tags,status,created_on,uid FROM articles"

        );
      if (article.rows.length === 0) {
        return res.status(404).json({ message: 'Article not found' });
      }
     // res.json(articles.rows);
     return res.status(200).json({
      response_code: 200,
      response_message: "Success",
      Data: article.rows
    });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },


  //get Article by page no and size

   getArticlesByPagination : async (req, res) => {
    try {
      const page = parseInt(req.params.page) || 1;
      const limit = parseInt(req.params.limit) || 5;
      const offset = (page - 1) * limit;
  
      const article = await Pool.query('SELECT FROM articles  ORDER BY id OFFSET $1 LIMIT $2', [offset, limit]);
  
      if (article.rows.length === 0) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: article.rows
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
  
  //get article by id
  getArticleById: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Pool.query(
        
        "SELECT id,title,author,content,category,subcategory,tags,status,created_on,uid FROM articles WHERE id=$1",
        [id] );

      if (article.rows.length === 0) {
        return res.status(404).json({ message: 'Article not found' });
      }

      return res.status(200).json({

        response_code: 200,
        response_message: "Success",
        Data: article.rows[0]

      });
     // res.json(article.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },

  // update article
  updateArticleById: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, content, category, subcategory, tags, created_on } = req.body;

      // Extract individual fields from req.body
      const article = await Pool.query(
        'UPDATE articles SET title=$1, author=$2, content=$3, category=$4, subcategory=$5, tags=$6, created_on=$7 WHERE id=$8 RETURNING *',
        [title, author, content, category, subcategory, tags, created_on, id]
      );

      if (article.rows.length === 0) {
        return res.status(404).json({ message: 'Article not found' });
      }
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        Data:article.rows[0]
      });
     // res.json(updateArticle.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  // delete article
  deleteArticleById: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Pool.query('DELETE FROM articles WHERE id=$1 RETURNING *', [id]);

      if (article.rows.length === 0) {
        return res.status(404).json({ message: 'Article not found' });
      }

      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
      
      });
      res.json({ message: 'Article deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  //Get artical by main category
  
  //get Artical  by sub category..
  
};
