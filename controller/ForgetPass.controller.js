const User = require('../model/users');

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
        } else {
            return res.render("forgot-password", { error: "Server error" });
        }
    } catch (err) {
        console.log(err.message);
        return res.render("forgot-password", { error: "Server error" });
    }
}

module.exports = { showForgetPassowrdPage, handleForgetPassword };