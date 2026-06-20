// require('dotenv').config();
// const nodemailer = require('nodemailer');

// // transporter setup
// // console.log(process.env.EMAIL_PASSWORD);

// // const transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASSWORD          // app password (NOT real password)
// //     }
// // });


// //Ai solver version of timeout 
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     family: 4,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

// transporter.verify((err, success) => {
//     if (err) {
//         console.error("VERIFY ERROR:", err);
//     } else {
//         console.log("SMTP READY");
//     }
// });

// // 👉 GET: show contact page
// exports.getContactPage = (req, res) => {
//     res.render('contactUs'); // contact.ejs file
// };


// // 👉 POST: send email
// exports.sendMessage = async (req, res) => {
//     try {
//         const { name, email, phone, subject, type, message } = req.body;

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER,
//             replyTo: email,

//             subject: `New Message: ${subject || "No Subject"}`,

//             text: `
// Name: ${name}
// Email: ${email}
// Phone: ${phone || "Not provided"}
// Type: ${type || "General"}

// Message:
// ${message}
//         `
//         };

//         const info = await transporter.sendMail(mailOptions);

//         console.log("Email sent:", info.response);

//         return res.status(200).send("✅ Email sent successfully");

//     } catch (error) {
//         console.error("SendMail Error:", error);
//         console.error("FULL ERROR:", error);
//         console.error("CODE:", error.code);
//         console.error("COMMAND:", error.command);

//         return res.status(500).send(error.message);
//     }
// };

const { Resend } = require('resend');

const resend = new Resend(process.env.EMAIL_RESEND); // put RESEND_API_KEY value in EMAIL_PASSWORD in Render env vars

// 👉 GET: show contact page
exports.getContactPage = (req, res) => {
    res.render('contactUs');
};

// 👉 POST: send email
exports.sendMessage = async (req, res) => {
    try {
        const { name, email, phone, subject, type, message } = req.body;

        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            // from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Message: ${subject || "No Subject"}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone || "Not provided"}</p>
                <p><b>Type:</b> ${type || "General"}</p>
                <hr/>
                <p><b>Message:</b></p>
                <p>${message}</p>
            `
        });

        if (error) {
            console.error("SendMail Error:", error);
            console.error("FULL ERROR:", error);
            console.error("CODE:", error.code);
            console.error("COMMAND:", error.command);
            return res.status(500).send(error.message);
        }

        console.log("Email sent:", data);
        return res.status(200).send("✅ Email sent successfully");

    } catch (error) {
        console.error("SendMail Error:", error);
        console.error("FULL ERROR:", error);
        console.error("CODE:", error.code);
        console.error("COMMAND:", error.command);
        return res.status(500).send(error.message);
    }
};