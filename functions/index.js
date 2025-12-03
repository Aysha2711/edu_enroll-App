const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Replace with your institute email and app password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jf.aysha004@gmail.com",
    pass: "pxqj rbzh nzwz nrix" // NOT your normal Gmail password
  }
});

exports.sendContactEmail = functions.https.onCall(async (data, context) => {
  const { name, email, subject, message } = data;

  const mailOptions = {
    from: "jf.aysha004@gmail.com",
    to: "jf.aysha004@gmail.com",
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
    console.error(error);
    return { success: false, error: error.message };
  }
});
