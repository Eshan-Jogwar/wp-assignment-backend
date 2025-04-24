const express = require("express");
const fs = require("fs");
const router = express.Router();

// GET timetable
router.get("/timeTable", (req, res) => {
  fs.readFile("timeTable.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read timetable." });
    res.json(JSON.parse(data));
  });
});

// POST timetable update
router.post("/updateTimeTable", (req, res) => {
  fs.writeFile("timeTable.json", JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).json({ error: "Failed to update timetable." });
    res.json({ message: "Timetable updated successfully." });
  });
});

module.exports = router;
