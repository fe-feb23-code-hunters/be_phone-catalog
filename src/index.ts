require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dbInit = require('./utils/dbInit');

const PORT = process.env.PORT || 3000;

const app = express();

dbInit();

app.use(cors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running in port ${PORT}`);
});
