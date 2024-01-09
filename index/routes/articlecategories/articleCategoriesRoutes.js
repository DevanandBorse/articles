const express = require('express');
const router = express.Router();
const ArticleCategoriesController = require('../../controller/articlecategories/articleCategoriesController');

const multer = require('multer');
const path = require('path');
var aws = require('aws-sdk')
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
var multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey: "2xZ5RUGWlJr9uM62+ewruU1esba+9GTsqqJeUmvr",
    accessKeyId: "AKIAW4VARQIH3RBBIEEC",
    region: "ap-south-1"
})

const s3 = new aws.S3();

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

const upload1 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "techbit",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            var fullPath = 'techbit/articles/images/' + file.originalname;
            cb(null, fullPath)
        }
    })
})

// Category API's
//AWS POST API
router.post('/categories', upload1.single('image'),ArticleCategoriesController.createCategories);
// Testig post api
router.post('/categories/testimg', upload.single('image'),ArticleCategoriesController.createCategories);
router.get('/categories', ArticleCategoriesController.getAllCategories);
router.get('/categories/:id',ArticleCategoriesController.searchCategoriesById);
router.put('/categories/:id',ArticleCategoriesController.updateCategoriesById);
router.delete('/categories/:id',ArticleCategoriesController.deleteCategoriesById);


module.exports = router;