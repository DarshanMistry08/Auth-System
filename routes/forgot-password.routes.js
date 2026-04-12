const express = require('express');
const router = express.Router();


const { showForgetPassowrdPage, handleForgetPassword, ProtectReserRoute } = require("../controller/ForgetPass.controller")

router.get('/', showForgetPassowrdPage);
router.post('/', handleForgetPassword);

router.get('/reset-password/:token', ProtectReserRoute);


// router.post('/reset-password');

module.exports = router;