const express = require('express');
const router=express.Router();
const iqsubcategoryController = require('../controllers/iqsubcategoryController');

router.post('/subcategory',iqsubcategoryController.createSubCategory);
router.get('/subcategory',iqsubcategoryController.getSubCategory);
router.get('/subcategory/:id',iqsubcategoryController.getSubCategoryById);
router.put('/subcategory/:id',iqsubcategoryController.updateSubCategoryById);
router.delete('/subcategory/:id',iqsubcategoryController.deleteSubCategoryById);

module.exports=router;