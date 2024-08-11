const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

const users = [
  { id: 1, username: 'user1', password: '$2b$10$N9qo8uLOickgx2ZMRZo5e.wKUt1M/ez0r0.KyWl1mCKJeiw5FZKAG' } // password: "password"
];

router.post('/login', authenticateToken, async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
