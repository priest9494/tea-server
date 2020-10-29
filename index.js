const express = require('express');
const cors = require("cors");

const app = express();
const port = process.env.port || 3030;

const teaTree = require('./routes/teaTree');
const collab = require('./routes/collaborativeFiltering');
const content = require('./routes/contentFiltering');

app.use(cors({
  preflightContinue: true,
  credentials: true,
}));

app.use('/', teaTree);
app.use('/', collab);
app.use('/', content);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})