const express = require('express');
const router = express.Router();
const {showForgetPassowrdPage,handleForgetPassword} = require("../controller/ForgetPass.controller")

router.get('/',showForgetPassowrdPage);
router.post('/',handleForgetPassword);

module.exports = router;