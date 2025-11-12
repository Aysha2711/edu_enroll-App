const express = require("express");
const admin = require("../config/firebase-admin");

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    return res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    });
  } catch (error) {
    if (error?.errorInfo?.code === "auth/email-already-exists") {
      return res.status(409).json({
        error: "Email already registered. Please sign in or reset password.",
      });
    }
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
});

// ⚠️ Firebase client handles login; backend verifies token only
router.post("/login", (req, res) => {
  return res
    .status(501)
    .json({ error: "Use Firebase client SDK to log in and send idToken to /verify-token." });
});

// GET /api/auth/profile/:uid
router.get("/profile/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const student = await admin.auth().getUser(uid);
    return res.json({
      uid: student.uid,
      email: student.email,
      displayName: student.displayName,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return res.status(404).json({ error: "Student not found" });
  }
});

// PUT /api/auth/profile/:uid
router.put("/profile/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const { displayName } = req.body;
    const updated = await admin.auth().updateUser(uid, { displayName });
    return res.json({
      uid: updated.uid,
      displayName: updated.displayName,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(400).json({ error: "Update failed" });
  }
});

// ✅ POST /api/auth/verify-token
router.post("/verify-token", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "idToken is required" });

    const decoded = await admin.auth().verifyIdToken(idToken);
    return res.json({ uid: decoded.uid, email: decoded.email });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
