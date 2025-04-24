const express = require('express');
const { getDb } = require('../db/mongo');

const router = express.Router();

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
  
      res.json({ message: "marksTracker updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:email/marks-tracker", async (req, res) => {
    const email = req.params.email;
  
    try {
      const db = getDb();
      const user = await db.collection("users").findOne({ email }, { projection: { marksTracker: 1, _id: 0 } });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ marksTracker: user.marksTracker || [] });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
  