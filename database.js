const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connection = process.env.MONGODB_URI;

mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));