const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/apis/insertArticles', articleController.createArticle);
router.get('/apis/getArticles', articleController.getArticles);
router.get('/apis/getArticles/:id', articleController.getArticleById);
 router.put('/apis/updateArticles/:id', articleController.updateArticleById);
 router.delete('/apis/deleteArticles/:id', articleController.deleteArticleById);

module.exports = router;