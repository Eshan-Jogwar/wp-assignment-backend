const express = require('express');
const { getDb } = require('../db/mongo');

const router = express.Router();

// PATCH route to update marksTracker for a specific user
router.patch("/:email/marks-tracker", async (req, res) => {
  const email = req.params.email;
  const { marksTracker } = req.body; // expects marksTracker array in request body

  if (!marksTracker) {
    return res.status(400).json({ error: "Missing marksTracker in request body" });
  }

  try {
    const db = getDb();
    const result = await db.collection("users").updateOne(
      { email },
      { $set: { marksTracker } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Returning the updated marksTracker data
    const updatedUser = await db.collection("users").findOne({ email });
    res.json({ message: "marksTracker updated successfully", marksTracker: updatedUser.marksTracker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to retrieve marksTracker for a specific user
router.get("/:email/marks-tracker", async (req, res) => {
  const email = req.params.email;

  try {
    const db = getDb();
    const result = await db.collection("users").findOne({ email });

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    // Returning the user's marksTracker data
    res.json({ marksTracker: result.marksTracker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
