const express = require("express");
const router = express.Router();
const { getDb } = require("../db/mongo");

// Get user data by email
router.get("/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const db = getDb();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch user's attendance data
router.get("/:email/attendance", async (req, res) => {
  const { email } = req.params;
  try {
    const db = getDb();
    const user = await db.collection("users").findOne({ email });

    if (!user || !user.attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }

    // Send the user's attendance data
    res.json(user.attendance); 
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
