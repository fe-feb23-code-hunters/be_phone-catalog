import express from 'express';
import productRouter from './routes/productRouter';
import cors from 'cors';
import bodyParser from 'body-parser';
import dbInit from './utils/dbInit';
import authRouter from './routes/authRouter';

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));

dbInit();

app.use(cors());

app.use(bodyParser.json());

app.use('/products', productRouter);
app.use('/auth', authRouter);

app.get('/', (_req, res) => {
  res.send('Hello World, from express');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running in port ${PORT}`);
});
