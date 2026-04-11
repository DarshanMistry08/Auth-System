const express = require('express');
const router = express.Router();
const {showForgetPassowrdPage,handleForgetPassword} = require("../controller/ForgetPass.controller")

router.get('/',showForgetPassowrdPage);
router.post('/',handleForgetPassword);

router.get('/reset-password', (req, res) => {
    const { token } = req.query;
    res.render('ResetPassPage', { token });
});

module.exports = router;