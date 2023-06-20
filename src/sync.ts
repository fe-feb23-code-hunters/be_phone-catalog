/* eslint-disable no-console */
import { Phone } from './models/Phone';
import { Product } from './models/Product';
import dbInit from './utils/dbInit';
import fs from 'fs';
import path from 'path';
import { User } from './models/User';
import { Order } from './models/Order';
import { ProductOrder } from './models/ProductOrder';

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

export const sync = async() => {
  dbInit();

  await Phone.sync({ alter: true });
  await Product.sync({ alter: true });
  await User.sync({ alter: true, force: true });
  await Order.sync({ alter: true, force: true });
  await ProductOrder.sync({ alter: true, force: true });

  await seedInitialPhones();
  await seedInitialProducts();
};
