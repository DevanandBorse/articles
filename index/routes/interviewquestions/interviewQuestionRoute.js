const express = require("express");
const router = express.Router();
const InterviewQuestionController = require("../../controller/interviewquestions/interviewQuestionController");

const multer = require("multer");
const path = require("path");

const storageEngine = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
    console.log("file.original name = " + file.originalname);
  },
});

const checkFileType = function (file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype); // Corrected from file.mimeType
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can only upload images!");
  }
};

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// API's
router.post(
  "/interviewQuestions",
  upload.single("image"),
  InterviewQuestionController.createInterviewQuestion
);
router.get(
  "/interviewQuestions",
  InterviewQuestionController.getInterviewQuestions
);
router.get(
  "/interviewQuestions/:id",
  InterviewQuestionController.getInterviewQuestionById
);
router.get(
  "/interviewQuestions/:pageno/:limit/:maincatid/:subcatid",
  InterviewQuestionController.getInterviewQuestionsByPagination
);
router.get(
  "/searchInterviewQuestions",
  InterviewQuestionController.searchInterviewQuestion
);
router.put(
  "/interviewQuestions/:id",
  InterviewQuestionController.updateInterviewQuestion
);
router.delete(
  "/interviewQuestions/:id",
  InterviewQuestionController.deleteInterviewQuestion
);

module.exports = router;
