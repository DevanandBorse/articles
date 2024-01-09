const ArticleModel = require("../../model/articles/createArticleModel");

const ArticleController = {
  createArticle: async (req, res) => {
    try {
      const articleData = req.body;

      const imageArray = req.files;

      console.log(imageArray);

      const article = await ArticleModel.createArticle(articleData);

      if (!article || !article.id) {
       return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Articles not Created" }
           });      
          }

      const articleInsertedId = article.id;


      // Check if images are present before attempting to insert

      if (imageArray && imageArray.length > 0) {
        // Use Promise.all to wait for all image insertions to complete
        const insertPromises = imageArray.map(async (item) => {
          const imagePath = "uploads/" + item.originalname;
          await ArticleModel.insertArticleImages(
            articleInsertedId,
            imagePath,
            1
          );
        });

        // Wait for all insertions to complete
        await Promise.all(insertPromises);
      }

      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        date: article,
        //id: articleInsertedId,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error Fild Datas");
    }
  },

  getArticlesByPagination: async (req, res) => {
    try {
      const { pageno, limit } = req.params;
      const articles = await ArticleModel.getArticlesByPagination(
        pageno,
        limit
      );

      if (articles.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Articles not found" }
           });      }

      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: articles,
      });
    } catch (error) {
      console.error(error.message);
      error;
      res.status(500).send("Server Error");
    }
  },

  getAllArticles: async (req, res) => {
    try {
      const articles = await ArticleModel.getAllArticles();
      if (articles.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Articles not found" }
           });    
          
          }

      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: articles,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  updateArticleById: async (req, res) => {
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

      const updatedArticle = await ArticleModel.updateArticleById(
        id,
        title,
        author,
        content,
        category,
        subcategory,
        tags,
        created_on
      );

      if (!updatedArticle) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Articles not found" }
           });
      }
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: { message: 'Article updated successfully' },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  deleteArticleById: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedArticle = await ArticleModel.deleteArticleById(id);

      if (deletedArticle.rowCount === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Article id not found" }
           });
      }

      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: { message: 'Article deleted successfully' },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getArticleById: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await ArticleModel.getArticleById(id);

      if (article.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Article id not found" }
           });
      }
      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: article,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  searchArticleByTitleWithImages: async (req, res) => {
    try {

      const title =
        req.query.title == ""
          ? null
          : req.query.title != "null"
          ? req.query.title
          : null;

      const articles = await ArticleModel.searchArticleByTitleWithImages(title);

      if (!articles || articles.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Article not found" }
           });      }

      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: articles,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  getMainCategory: async (req, res) => {
    try {
      const categories = await ArticleModel.getMainCategory();

      if (categories.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Category not found" }
           });      }

      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: categories,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  },

  getSubCategory: async (req, res) => {
    const { id } = req.params;

    const categories = await ArticleModel.getSubCategory(id);

    try {
      if (categories.length === 0) {
        return res.status(404).json({
          response_code: 404,
          response_message: "Success",
          data: { message: "Category not found" }
           });   
      }

      return res.status(200).json({
        response_code: 200,
        response_message: "Success",
        data: categories,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }

  },
};

module.exports = ArticleController;
