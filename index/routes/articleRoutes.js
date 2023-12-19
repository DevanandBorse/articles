const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

 router.post('/articles', articleController.createArticle);
 router.get('/allarticles', articleController.getAllArticles);
 router.get('/articles/:id', articleController.getArticleById);
 router.put('/articles/:id', articleController.updateArticleById);
 router.delete('/articles/:id', articleController.deleteArticleById);
 router.get('/articles/:page/:limit', articleController.getArticlesByPagination);


module.exports = router;