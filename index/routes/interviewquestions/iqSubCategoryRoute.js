const express = require('express');
const router=express.Router();
const SubCategoryController = require('../../controller/interviewquestions/iqSubCategoryController');

router.post('/subcategory',SubCategoryController.createSubCategory);
router.get('/subcategory',SubCategoryController.getSubCategory);
router.put('/subcategory/:id',SubCategoryController.updateSubCategoryById);
router.delete('/subcategory/:id',SubCategoryController.deleteSubCategoryById);

module.exports=router;