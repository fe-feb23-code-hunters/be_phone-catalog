/* eslint-disable no-console */
import { Phone } from './models/Phone';
import { Product } from './models/Product';
import dbInit from './utils/dbInit';
import fs from 'fs';
import path from 'path';

const seedInitialPhones = async() => {
  try {
    const phonesFolderPath = path.join(
      __dirname,
      '..',
      'public',
      'api',
      'phones',
    );

    const phoneFiles = fs.readdirSync(phonesFolderPath);

    const phoneDataArray = [];

    for (const phoneFile of phoneFiles) {
      const phoneFilePath = path.join(phonesFolderPath, phoneFile);
      const phoneFileContent = fs.readFileSync(phoneFilePath, 'utf-8');
      const phoneData = JSON.parse(phoneFileContent);

      phoneDataArray.push(phoneData);
    }

    await Phone.bulkCreate(phoneDataArray);
  } catch (error) {
    console.log('Error seeding data:', error);
  }
};

const seedInitialProducts = async() => {
  try {
    const productsFilePath = path.join(
      __dirname,
      '..',
      'public',
      'api',
      'products.json',
    );

    const productsFileContent = fs.readFileSync(productsFilePath, 'utf-8');
    const productsData = JSON.parse(productsFileContent);

    console.log(productsData);

    await Product.bulkCreate(productsData);
  } catch (error) {
    console.log('Error seeding data:', error);
  }
};

const sync = async() => {
  dbInit();

  await Phone.sync({ alter: true });
  await Product.sync({ alter: true });

  await seedInitialPhones();
  await seedInitialProducts();
};

sync();
