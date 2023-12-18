const express =require('express');
const router = express.Router();
const  categoryController = require('../controllers/categoryController');


router.post('/category',categoryController.createCategory);
router.get('/category',categoryController.getCategory);
router.get('/category/:id',categoryController.searchCategoryById);
router.put('/category/:id',categoryController.updateCategoryById);
router.delete('/category/:id',categoryController.deleteCtaegoryById);

module.exports =router;