
const ArticleService = require("../../services/articles/createArticleService");

const ArticleModel = {
  createArticle: async (articleData) => {
    try {
      const article = await ArticleService.createArticle(articleData);
      return article.rows[0];
    } catch (error) {
      console.error(error.message);
    }
  },

  insertArticleImages: async (articleId, imagePath, status) => {
    try {
      console.log("Inserting image:", { articleId, imagePath, status });
      const articleImages = await ArticleService.insertArticleImages(
        articleId,
        imagePath,
        status
      );

      return articleImages;
    } catch (error) {
    console.error(error.message);
    }
  },

  

  getArticlesByPagination: async (pageno, limit) => {
    const offset = (pageno - 1) * limit;
    try {
      const articles = await ArticleService.getArticlesByPagination(
        offset,
        limit
      );
      return articles.rows;
    } catch (error) {
    console.error(error.message);
    }
  },

  getAllArticles: async () => {
    try {
      const articles = await ArticleService.getAllArticles();
      return articles.rows;
    } catch (error) {
    console.error(error.message);
    }
  },

  updateArticleById: async (
    id,
    title,
    author,
    content,
    category,
    subcategory,
    tags,
    created_on
  ) => {
    try {
      const updatedArticle = await ArticleService.updateArticleById(
        title,
        author,
        content,
        category,
        subcategory,
        tags,
        created_on,
        id
      );
      return updatedArticle.rows[0];
    } catch (error) {
         console.error(error.message);

    }
  },

  deleteArticleById: async (id) => {
    try {
      const deletedArticle = await ArticleService.deleteArticleById(id);

      return deletedArticle;
    } catch (error) {
    console.error(error.message);
    }
  },

  getArticleById: async (id) => {
    try {
      const article = await ArticleService.getArticleById(id);

      return article.rows;
    } catch (error) {
         console.error(error.message);

    }
  },

  searchArticleByTitleWithImages: async (title) => {
    try {
      const ImageResult = await ArticleService.searchArticleByTitleWithImages(
        title
      );
      return ImageResult.rows;
    } catch (error) {
          console.error(error.message);

    }
  },

  getMainCategory: async () => {
    try {
      const categories = await ArticleService.getMainCategory();
      return categories.rows;
    } catch (error) {
    console.error(error.message);
 
    }
  },

  getSubCategory: async (id, res) => {
    try {
      const categories = await ArticleService.getSubCategory(id, res);

      return categories.rows;
    } catch (error) {
    console.error(error.message);
    
    }
  },
};

module.exports = ArticleModel;
