const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Gmail App Password authentication
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jf.aysha004@gmail.com",
    pass: "pxqj rbzh nzwz nrix" // your Gmail App Password
  }
});

// POST /api/enroll
router.post("/", async (req, res) => {
  const { fullName, email, phone, courseTitle, price, duration } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const mailOptions = {
    from: `"${fullName}" <${email}>`,
    to: "jf.aysha004@gmail.com",
    subject: `New Course Enrollment Request – ${courseTitle}`,
    text: `
A new student has submitted an enrollment request.

===== STUDENT DETAILS =====
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}

===== COURSE DETAILS =====
Course: ${courseTitle}
Price: Rs. ${price}
Duration: ${duration}

Please reach out to the student to proceed with the enrollment.
`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Enrollment request sent successfully" });
  } catch (error) {
    console.error("Enrollment email error:", error);
    res.status(500).json({ success: false, message: "Failed to send enrollment email", error: error.message });
  }
});

module.exports = router;
