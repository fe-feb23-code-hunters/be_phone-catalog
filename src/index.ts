import { dbInit } from './utils/dbInit';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

dbInit();

app.use(cors());

app.get('/', (_req, res) => {
  res.send('Hello World, from express');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running in port ${PORT}`);
});
