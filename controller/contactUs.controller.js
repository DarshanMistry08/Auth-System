require('dotenv').config();
const nodemailer = require('nodemailer');

// transporter setup
// console.log(process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: "mistryydarshan08@gmail.com",
        pass: process.env.EMAIL_PASSWORD          // app password (NOT real password)
    }
});


// 👉 GET: show contact page
exports.getContactPage = (req, res) => {
    res.render('contactUs'); // contact.ejs file
};


// 👉 POST: send email
exports.sendMessage = (req, res) => {
    const { name, email, phone, subject, type, message } = req.body;

    const mailOptions = {
from: "mistryydarshan08@gmail.com",
        to: "mistryydarshan08@gmail.com",
        replyTo: email,

        subject: `New Message: ${subject || "No Subject"}`,

        text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Type: ${type || "General"}

Message:
${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.send("❌ Email failed to send");
        } else {
            console.log("Email sent:", info.response);
            return res.send("✅ Email sent successfully");
        }
    });
};

