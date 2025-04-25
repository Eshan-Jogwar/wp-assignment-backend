const express = require("express");
const router = express.Router();
const { getDb } = require("../db/mongo");

router.get('/students', async (req, res) => {
    try {
      const db = getDb();
      const students = await db.collection("users").find({ role: 'student' }).toArray();
      res.json({ students });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch students" });
    }
});

module.exports = router;