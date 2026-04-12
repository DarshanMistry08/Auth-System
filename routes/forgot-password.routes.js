const express = require('express');
const router = express.Router();


const { showForgetPassowrdPage, handleForgetPassword, ProtectReserRoute ,CheckPostRoute} = require("../controller/ForgetPass.controller")

router.get('/', showForgetPassowrdPage);
router.post('/', handleForgetPassword);



router.get('/:token', ProtectReserRoute);
router.post('/:token',CheckPostRoute);

// router.post('/reset-password');

module.exports = router;

