const express =require('express');
const router = express.Router();
const  categoryController = require('../controllers/categoryController');


router.post('/apis/Category',categoryController.createCategory);
router.get('/apis/category',categoryController.getCategory);
router.get('/apis/category/:id',categoryController.searchCategoryById);
router.put('/apis/category/:id',categoryController.updateCategoryById);
router.delete('/apis/category/:id',categoryController.deleteCtaegoryById);

module.exports =router;