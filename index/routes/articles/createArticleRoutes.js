const express = require("express");
const router = express.Router();
const articleController = require("../../controller/articles/createArticleController");


const multer = require("multer");
const path = require("path");
// var aws = require('aws-sdk')
// require("aws-sdk/lib/maintenance_mode_message").suppress = true;
// var multerS3 = require('multer-s3')

// aws.config.update({
//     secretAccessKey: "2xZ5RUGWlJr9uM62+ewruU1esba+9GTsqqJeUmvr",
//     accessKeyId: "AKIAW4VARQIH3RBBIEEC",
//     region: "ap-south-1"
// })

// const s3 = new aws.S3();

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


// const upload1 = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: "techbit",
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             var fullPath = 'techbit/articles/images/' + file.originalname;
//             cb(null, fullPath)
//         }
//     })
// })



// router.post('/apis/testimg',upload.array("images", 5), (req, res) => {
//     console.log(req.files);	
// });




// const multer= require('multer');
// const path= require('path');


// const storage= multer.diskStorage({
//   destination:function(req,file,cb){
//     cb(null,'uploads');
//   },
//   filename:function(req,file,cb){
//     cb(null,Data.now()+path.extname(file.originalname));
//   },
// });

// // File filter function to allow only JPG and PNG images
// const fileFilter = function (req, file, cb) {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error('Only JPG and PNG images are allowed!'), false); // Reject the file
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5 MB limit (adjust as needed)
//   },
//   fileFilter: fileFilter, // Set the file filter

// }).single('article_image');



//router.post('/articles',articleController.createArticle);
router.post('/articles', upload.array('images',5), articleController.createArticle);
router.get("/allarticles", articleController.getAllArticles);
router.get("/articles/:id", articleController.getArticleById);
router.put("/articles/:id", articleController.updateArticleById);
router.delete("/articles/:id", articleController.deleteArticleById);
//router.get("/searcharticles/", articleController.searchArticleByTitle);
router.get("/articles/:pageno/:limit",articleController.getArticlesByPagination);
router.get("/getMainCategory", articleController.getMainCategory);
router.get("/getSubCategory/:id",articleController.getSubCategory);
router.get('/articles', articleController.searchArticleByTitleWithImages);




module.exports = router;
