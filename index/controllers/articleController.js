const Pool = require('../database');

// Insert the article
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
      const articles = await Pool.query(
        'INSERT INTO articles(title,author,content,category,subcategory,tags,status,created_on,uid) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
        [ title, author, content, category, subcategory, tags, status, created_on, uid]
      ); 
      return res.status(200).json({
        response_code: 200,
        response_message: 'Success',
        data: articles.rows[0]
      });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  // get articles
  getArticles: async (req, res) => {
    try {
      const articles = await Pool.query('SELECT id,title,author,content,category,subcategory,tags,status,created_on,uid FROM articles');
      if (articles.rows.length === 0) {
        return res.status(404).json({ response_message: 'Article not found' });
      }
      res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: articles.rows
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },

  //get article by id
  getArticleById: async (req, res) => {
    try {
      const { id }  = req.params;
      const article = await Pool.query('SELECT title,author,content,category,subcategory,tags,status,created_on,uid FROM articles WHERE id=$1',[id]);

      if (article.rows.length === 0) {
        return res.status(404).json({ response_message: 'Article not found' });
      }

      res.json({
        response_code: 200,
        response_message: "Success",
        data: article.rows[0]
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(' Internal Server Error');
    }
  },

  // update article
  updateArticleById: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, content, category, subcategory, tags, created_on } = req.body;

      // Extract individual fields from req.body
      const updateArticle = await Pool.query(
        'UPDATE articles SET title=$1, author=$2, content=$3, category=$4, subcategory=$5, tags=$6, created_on=$7 WHERE id=$8 RETURNING *',
        [title, author, content, category, subcategory, tags, created_on, id]
      );
      return res.status(200).json({ 
        response_code: 200,
        response_message: 'Success',
        data: updateArticle.rows[0]
      });   

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
        return res.status(404).json({ response_message: 'Article not found' });
      }

      res.json({ 
        response_code: 200,
        response_message: "Success" 
    });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
