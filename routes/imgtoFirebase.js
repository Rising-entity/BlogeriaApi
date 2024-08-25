const express = require('express');
const router1 = express.Router();
const multer = require('multer'); 
const path = require("path");


// Import the imgHandler function
const { UploadImgToFirebaseHandler } = require('../controllers/imgController');


// Set up multer middleware
const upload = multer({ storage: multer.memoryStorage() });


// uplaod img with multer middleware 
router1.post("/upload", upload.single("image"), UploadImgToFirebaseHandler);


module.exports = {router1};