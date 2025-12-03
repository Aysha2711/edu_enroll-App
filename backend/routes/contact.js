const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Replace with your institute email and app password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jf.aysha004@gmail.com",
    pass: "pxqj rbzh nzwz nrix" // Use Gmail App Password
  }
});

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`,
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
    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
  }
});

module.exports = router;
