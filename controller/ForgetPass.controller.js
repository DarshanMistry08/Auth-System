const User = require('../model/users');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');


async function showForgetPassowrdPage(req, res) {
    res.render('forgot-password');
}
const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mistryydarshan08@gmail.com",
        pass: process.env.EMAIL_PASSWORD
    }
})
async function handleForgetPassword(req, res) {



    // console.log(req.body.email);
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("forgot-password", { error: "User not found" });
        }

        //Random String token Generate 
        const token = crypto.randomBytes(16).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");  //add hash validation 
        user.resetToken = hashedToken;
        // console.log("token",token)
        // console.log("hashedToken",hashedToken)
        user.resetTokenExpires = Date.now() + 200 * 60 * 1000;    //add 15 later
        await user.save();

        const ResetLink = `http://localhost:${process.env.PORT}/reset-password?token=${token}`;
        console.log("Password reset link:", ResetLink);

        // send mail
        // const mailOptions ={
        //     from:"mistryydarshan08@gmail.com",
        //     to:user.email,
        //     subject:"Password Reset Request",
        //     text: `You requested a password reset. Click the link to reset your password: ${ResetLink}`
        // };


        const resetLink = `http://localhost:4000/reset-password/${token}`;

        await transpoter.sendMail({
            to: user.email,
            subject: "Reset Password",
            html: `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background:#f2f2f2;font-family:Arial, sans-serif;">

    <div style="max-width:500px;margin:40px auto;background:white;border-radius:8px;padding:30px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
      
      <h2 style="color:#4285F4;margin-bottom:10px;">Darshan's App</h2>

      <h3 style="margin:10px 0;color:#333;">Reset your password</h3>

      <p style="color:#555;font-size:14px;">
        We received a request to reset your password.
      </p>

      <a href="${resetLink}"
         style="display:inline-block;margin-top:20px;padding:12px 25px;background:#1a73e8;color:white;text-decoration:none;border-radius:5px;font-weight:bold;">
         Reset Password
      </a>

      <p style="margin-top:20px;font-size:13px;color:#777;">
        This link will expire in 15 minutes.
      </p>

      <p style="font-size:12px;color:#aaa;">
        If you didn’t request this, you can safely ignore this email.
      </p>

    </div>

  </body>
  </html>
  `
        });

        transpoter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.send("❌ Email failed to send");
            } else {
                console.log("Email sent:", info.response);
                return res.send("✅ Email sent successfully");
            }
        });

        return res.render("forgot-password", { error: "Password reset link sent to your email " });


    } catch (err) {
        console.log(err.message);
        return res.render("forgot-password", { error: "Server error" });
    }
}




async function ProtectReserRoute(req, res) {
// console.log("RAW TOKEN:", req.params.token);

const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

// console.log("HASHED TOKEN:", hashedToken);      //1

    const user = await User.findOne({
        resetToken: hashedToken,
        resetTokenExpires: { $gt: Date.now() }
    });
    // console.log("TOKEN:", req.params.token);

    if (!user) {
        return res.send("Invalid or expired token, please try again");
    }

    res.render('ResetPassPage', { token: req.params.token });
}




// Here Check about after entered user validation
async function CheckPostRoute(req, res) {
    const token = req.params.token;
    // console.log("post route token", token);
    const hashedToken = crypto.createHash('sha256').update(token).digest("hex");

    const user = await User.findOne({
        resetToken: hashedToken,
        resetTokenExpires: { $gt: Date.now() }

        
    });
    // console.log("HASHED TOKEN:", hashedToken);           //2

    if (!user) {
        return res.send("Invalid or expired token")
    }
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
        res.send("Empty filed is not valid please enter password")
    }
    if (password !== confirmPassword) {
        res.send("Both field's password not match try again,...!")
    }
    if (password.length < 6) {
        res.send("Enter Strong password")
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    console.log(user);
    await user.save();

    res.send("Password reset successful");
}




module.exports = { showForgetPassowrdPage, handleForgetPassword, ProtectReserRoute, CheckPostRoute };