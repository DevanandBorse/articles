const express = require('express');
const router = express.Router();
const ArticleCategoriesController = require('../../controller/articlecategories/articleCategoriesController');

const multer = require('multer');
const path = require('path');

const storageEngine = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}--${file.originalname}`);
		// cb(null, `${file.originalname}`);
	},
});
const checkFileType = function (file, cb) {
	const fileTypes = /jpeg|jpg|png|gif|svg/;
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);
	if (mimeType && extName) {
		return cb(null, true);
	} else {
		cb("Error: You can Only Upload Images!!");
	}
};
const upload = multer({
	storage: storageEngine,
	limits: { fileSize: 1000000 },
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
});

// // Multer configuration for image upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Set your desired upload directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// POST request for creating a category
router.post('/categories', upload.single('image'),ArticleCategoriesController.createCategories);
router.get('/categories', ArticleCategoriesController.getAllCategories);
router.get('/categories/:id',ArticleCategoriesController.searchCategoriesById);
router.put('/categories/:id',ArticleCategoriesController.updateCategoriesById);
router.delete('/categories/:id',ArticleCategoriesController.deleteCategoriesById);

// router.get('/parentcategorieslist/:pagesize',articlecategoriesController.getParentCategory);
// router.get('/subcategorieslist/:category/:subcategory',articlecategoriesController.getSubCategory);



module.exports = router;