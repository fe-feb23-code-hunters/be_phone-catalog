import { Phone } from '../models/Phone';
import { Product } from '../models/Product';

export async function getAll({ offset, limit }) {
  const { rows: rawProducts, count: totalCount } = await Product
    .findAndCountAll({
      include: [{ model: Phone }],
      offset,
      limit,
    });

  const products = rawProducts.map(({ dataValues }) => ({
    ...dataValues,
    phone: dataValues.phone.dataValues,
  }));

  return {
    rows: products,
    count: totalCount,
  };
}
