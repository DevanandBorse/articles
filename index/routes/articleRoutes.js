const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

 router.post('/articles', articleController.createArticle);
 router.get('/articles', articleController.getArticles);
 router.get('/articles/:id', articleController.getArticleById);
router.post('/articles', articleController.createArticle);
router.get('/articles/:page/:limit', articleController.getArticles);
router.get('/articles/:id', articleController.getArticleById);
 router.put('/articles/:id', articleController.updateArticleById);
 router.delete('/articles/:id', articleController.deleteArticleById);

module.exports = router;