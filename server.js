const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Test = require('./models/questions.model.js');

app.use(express.json());

app.post('/api/tests', async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(200).json(product);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});


app.get('/', (req, res) => {
  res.send("Hello from NodeAPI");
});

mongoose.connect("mongodb+srv://someUser:lCvSOxqDeRshhG4N@scholarspath.yprwrdl.mongodb.net/?retryWrites=true&w=majority&appName=ScholarsPath")
  .then(() => {
    console.log("connected to DB");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Some MongoDB connection error:", err.message);
  });