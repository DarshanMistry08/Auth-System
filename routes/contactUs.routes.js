
const express = require('express');
const router = express.Router();
const contactUsController = require('../controller/contactUs.controller');
const {getContactPage , sendMessage} = require('../controller/contactUs.controller');
// show form
// router.get('/', contactUsController);
// router.post('/', contactUsController);

router.get('/', contactUsController.getContactPage);
router.post('/', contactUsController.sendMessage);

module.exports = router;