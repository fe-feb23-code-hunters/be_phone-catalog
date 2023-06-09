import { Phone } from './models/Phone';
import { Product } from './models/Product';
import { dbInit } from './utils/dbInit';

const sync = async() => {
  dbInit();

  await Phone.sync({ alter: true });
  await Product.sync({ alter: true });
};

sync();
