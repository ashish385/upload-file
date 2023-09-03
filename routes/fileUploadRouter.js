const express = require("express");
const Router = express.Router();

const { localFileUpload, imageUpload ,vidoUpload, imageSizeReducer} = require("../controllers/fileUploadController");
//  imageUpload, videoUpload, imageReducerUpload, 

// api route

Router.post("/localFileUpload", localFileUpload);
Router.post("/imageUpload", imageUpload);
Router.post("/vidoUpload", vidoUpload);
Router.post("/imageSizeReducer", imageSizeReducer);

module.exports = Router; 

// 911161264411