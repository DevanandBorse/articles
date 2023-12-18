const express = require('express');
const router = express.Router()
// const interviewQuestionController = require('../controllers/interviewQuestionController');
const  maincategoryController=require('../controllers/iqMaincategoryController');

router.post("/maincategory",maincategoryController.createmaincategory);
router.get('/maincategory', maincategoryController.getmaincategory);
router.get("/maincategory/:id",maincategoryController.getmaincategoryById);
router.put('/maincategory/:id',maincategoryController.updatemaincategoryById);
router.delete('/maincategory/:id',maincategoryController.deletemaincategoryById);

module.exports = router;