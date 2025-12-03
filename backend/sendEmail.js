const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Your institute email credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_INSTITUTE_EMAIL@gmail.com",
    pass: "YOUR_APP_PASSWORD" // (NOT your Gmail password)
  }
});

exports.sendContactEmail = functions.https.onCall(async (data, context) => {
  const { name, email, subject, message } = data;

  const mailOptions = {
    from: "YOUR_INSTITUTE_EMAIL@gmail.com",
    to: "YOUR_INSTITUTE_EMAIL@gmail.com",
    subject: `Contact Form: ${subject}`,
    text: `
New Contact Form Submission:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
});
