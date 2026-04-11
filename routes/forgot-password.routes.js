const express = require('express');
const router = express.Router();

// const { showForgetPassowrdPage, handleForgetPAssowrd}

router.get('/',(req,res)=>{
    res.render('forgot-password');
})
router.post('/',(req,res)=>{
    // handleForgetPAssowrd(req,res);
    res.send("Password reset link sent to your email (This is a placeholder response).");
})

module.exports = router;