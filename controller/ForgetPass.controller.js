const User = require('../model/users');
const crypto = require("crypto");
async function showForgetPassowrdPage(req, res) {
    res.render('forgot-password');
}
async function handleForgetPassword(req, res) {

    // console.log(req.body.email);
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("forgot-password", { error: "User not found" });
        }
        
        const token = crypto.randomBytes(16).toString("hex");
        user.resetToken = token;
        user.resetTokenExpires = Date.now() + 15 * 60 * 1000;  
        await user.save();

        const ResetLink = `http://localhost:${process.env.PORT}/reset-password?token=${token}`;
        console.log("Password reset link:", ResetLink);
        
        
        
        
            return res.render("forgot-password", { error: "Password reset link sent to your email " });
        
        
    } catch (err) {
        console.log(err.message);
        return res.render("forgot-password", { error: "Server error" });
    }
}

module.exports = { showForgetPassowrdPage, handleForgetPassword };