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
router.post('/', async (req, res) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log('Hashed password:', hashedPassword);

    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
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

module.exports = router;
