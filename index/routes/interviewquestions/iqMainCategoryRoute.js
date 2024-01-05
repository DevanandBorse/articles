const express = require('express');
const router = express.Router()
const  MainCategoryController=require('../../controller/interviewquestions/iqMainCategoryController');

router.post("/maincategory",MainCategoryController.createmaincategory);
router.get('/maincategory', MainCategoryController.getmaincategory);
router.put('/maincategory/:id',MainCategoryController.updatemaincategoryById);
router.delete('/maincategory/:id',MainCategoryController.deletemaincategoryById);

module.exports = router;