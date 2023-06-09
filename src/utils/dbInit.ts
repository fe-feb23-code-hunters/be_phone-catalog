/* eslint-disable no-console */
import { Sequelize } from 'sequelize-typescript';
import { models } from '../models';
require('dotenv').config();

const URI = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}`
+ `@${process.env.DB_HOST}/${process.env.DB_NAME}`;

export const dbInit = () => {
  try {
    const db = new Sequelize(
      URI,
      {
        models,
        dialectOptions: {
          ssl: true,
        },
      },
    );

    console.log(process.env.DB_NAME);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_HOST);

    console.log('DB successfully initialized');

    return db;
  } catch (error) {
    console.log('DB failed to connect', error);
  }
};
<<<<<<< HEAD

export default dbInit;
=======
>>>>>>> f09dbc3 (Create product and phone  tables)
