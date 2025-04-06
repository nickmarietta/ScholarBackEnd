const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connecter');
const jwt = require('jsonwebtoken');
const router = express.Router();

// route to get all users
router.get('/', async (req, res) => {
  try {
    const collection = db.collection('Users');
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
});

// route to create a new user
router.post('/signup', async (req, res) => {
  const saltRounds = 10;

  try {
    const existingUser = await db.collection('Users').findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log('Hashed password:', hashedPassword);

    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'student',
    };

    const collection = db.collection('Users');
    const result = await collection.insertOne(newUser);
    console.log('User created:', result);
    res.status(201).send(result);
  } catch (err) {
    console.error('Error adding newUser:', err);
    res.status(500).send('Error adding newUser');
  }
});

// route to login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const collection = db.collection('Users');
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email, role: user.role || 'student' }, 'secretkey', {
      expiresIn: '2h',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
