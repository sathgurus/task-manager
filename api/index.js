const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));


app.get('/',(req,res)=>{
  res.send('Hello World');
})


app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/project',require('./routes/project'))



const server = app.listen(port, () => console.log(`Server running on port ${port}`));


module.exports = {app,server}
