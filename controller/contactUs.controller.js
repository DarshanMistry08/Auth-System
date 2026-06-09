require('dotenv').config();
const nodemailer = require('nodemailer');

// transporter setup
// console.log(process.env.EMAIL_PASSWORD);

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD          // app password (NOT real password)
//     }
// });


//Ai solver version of timeout 
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

transporter.verify((err, success) => {
    if (err) {
        console.error("VERIFY ERROR:", err);
    } else {
        console.log("SMTP READY");
    }
});

// 👉 GET: show contact page
exports.getContactPage = (req, res) => {
    res.render('contactUs'); // contact.ejs file
};


// 👉 POST: send email
exports.sendMessage = async (req, res) => {
    try {
        const { name, email, phone, subject, type, message } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
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

        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent:", info.response);

        return res.status(200).send("✅ Email sent successfully");

    } catch (error) {
        console.error("SendMail Error:", error);
        console.error("FULL ERROR:", error);
        console.error("CODE:", error.code);
        console.error("COMMAND:", error.command);

        return res.status(500).send(error.message);
    }
};

