const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectToMongo } = require('./db/mongo');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/userdata', require('./routes/user'));
app.use('/api/userdata', require('./routes/updateUser'));
app.use('/api/', require('./routes/timeTable'));

connectToMongo().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
