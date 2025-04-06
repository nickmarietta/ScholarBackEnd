const express = require('express');
const cors = require('cors');
const users = require('./routes/users');
const PORT = process.env.PORT || 8000;
const app = express();
const modules = require('./routes/subject');

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE'] }));
app.use(express.json());

app.use('/users', users);

app.use('/modules', modules);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;