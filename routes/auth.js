const express = require('express');
const { getDb } = require('../db/mongo');

const router = express.Router();

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const db = getDb();

  try {
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    if (user.password !== password) return res.status(401).json({ msg: 'Incorrect password' });

    // Include the role in the response
    res.json({
      msg: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,  // Return role here
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
