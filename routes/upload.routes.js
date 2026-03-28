const express = require('express');
const router = express.Router();

const { handleUploadPage, handleFileUpload } = require('../controller/upload.controller');

// multer import
const upload = require('../config/multer'); 

router.get('/upload', handleUploadPage);
router.post('/upload', upload.single("image"), handleFileUpload);

module.exports = router;