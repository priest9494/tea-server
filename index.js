const express = require('express');
const cors = require("cors");

const app = express();
const port = process.env.port || 3030;

const teaTree = require('./routes/teaTree');
const collab = require('./routes/collaborativeFiltering');
const content = require('./routes/contentFiltering');
const params = require('./routes/paramsFiltering');
const recommend = require('./routes/recommend');

app.use(cors({
  preflightContinue: true,
  credentials: true,
}));

app.use('/', teaTree);
app.use('/', collab);
app.use('/', content);
app.use('/', params);
app.use('/', recommend);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})