import { Sequelize } from 'sequelize-typescript';
import { models } from '../models';

require('dotenv').config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const URI = `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

const dbInit = () => {
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

    // eslint-disable-next-line no-console
    console.log('DB successfully initialized');

    return db;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('DB failed to connect', error);
  }
};

export default dbInit;
