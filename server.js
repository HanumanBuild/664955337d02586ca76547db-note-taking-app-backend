const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('./database');

const notesRouter = require('./routes/notes');

app.use(cors());
app.use(bodyParser.json());

app.use('/notes', notesRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});