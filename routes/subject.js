const express = require('express');
const router = express.Router();
const db = require('../db/connecter');

router.get('/', async (req, res) => {
  try {
    const collection = db.collection('Modules');
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching modules:', err);
    res.status(500).send('Error fetching modules');
  }
});

router.get('/:subject/questions', async (req, res) => {
    const subject = req.params.subject;
  
    try {
      const collection = db.collection('Modules');
      const module = await collection.findOne({ subject });
  
      if (!module) {
        return res.status(404).send(`No module found for subject: ${subject}`);
      }
  
      res.status(200).json(module.questions);
    } catch (err) {
      console.error('Error fetching questions:', err);
      res.status(500).send('Error fetching questions');
    }
  });

module.exports = router;