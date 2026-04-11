// const express = require('express');
// const nodemailer = require('nodemailer');

// const router = express.Router();
// router.get('/', (req, res) => {
//     res.render('contactUs');
// });
// // transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: "mistryydarshan08@gmail.com",
//         pass: "process.env.EMAIL_PASSWORD"
//     }
// });

// // route
// router.post('/contact', (req, res) => {

//     const mailOptions = {
//         from: "mistryydarshan08@gmail.com",
//         to: "mistryydarshan08@gmail.com",
//         replyTo: req.body.email,

//         subject: `New Message: ${req.body.subject}`,

//         text: `
//         Name: ${req.body.name}
//         Email: ${req.body.email}
//         Phone: ${req.body.phone || "Not provided"}
//         Type: ${req.body.type}

//         Message:
//         ${req.body.message}
//         `
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             return res.send("Email send failed ❌");
//         } else {
//             return res.send("Email sent successfully ✅");
//         }
//     });

// });

// module.exports = router;





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

// exports.sendMessage = (req, res) => {
//     console.log("POST route hit ✅");  // 👈 add this

//     res.send("working");
// };

// module.exports = router;