const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/users.js');

// login page
function showLoginPage(req, res) {
    res.render('login');
}
//  login
async function LoginUser(req, res) {
    // console.log("LOGIN HIT"); 
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('login', { error: "Email and password required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.render('login', { error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('login', { error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET
        );
        res.cookie("token", token);
        // return res.redirect('/users');  
        return res.render("logout");

    } catch (err) {
        console.log("ERROR:", err.message);
        return res.render('login', { error: "Server error" });
    }
}

module.exports = { showLoginPage, LoginUser };