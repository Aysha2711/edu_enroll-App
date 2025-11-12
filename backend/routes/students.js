const express = require("express");
const admin = require("../config/firebase-admin");

const router = express.Router();

// GET /api/admin/students
router.get("/", async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const students = listUsersResult.users.map(student => ({
      uid: student.uid,
      email: student.email,
      displayName: student.displayName,
      disabled: student.disabled,
      emailVerified: student.emailVerified,
      metadata: {
        creationTime: student.metadata.creationTime,
        lastSignInTime: student.metadata.lastSignInTime
      }
    }));
    return res.json(students);
  } catch (error) {
    console.error("Students fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch students" });
  }
});

// GET /api/admin/students/:studentId
router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await admin.auth().getUser(studentId);
    return res.json({
      uid: student.uid,
      email: student.email,
      displayName: student.displayName,
      disabled: student.disabled,
      emailVerified: student.emailVerified,
      metadata: {
        creationTime: student.metadata.creationTime,
        lastSignInTime: student.metadata.lastSignInTime
      }
    });
  } catch (error) {
    console.error("Student fetch error:", error);
    return res.status(404).json({ error: "Student not found" });
  }
});

// PUT /api/admin/students/:studentId/role
router.put("/:studentId/role", async (req, res) => {
  try {
    const { studentId } = req.params;
    const { role } = req.body;
    
    // Set custom claims for role
    await admin.auth().setCustomUserClaims(studentId, { role });
    
    return res.json({ message: "Student role updated successfully" });
  } catch (error) {
    console.error("Student role update error:", error);
    return res.status(400).json({ error: "Failed to update student role" });
  }
});

// DELETE /api/admin/students/:studentId
router.delete("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    await admin.auth().deleteUser(studentId);
    return res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Student deletion error:", error);
    return res.status(400).json({ error: "Failed to delete student" });
  }
});

module.exports = router;