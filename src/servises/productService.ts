import { Sequelize, Op } from 'sequelize';
import { Phone } from '../models/Phone';
import { Product } from '../models/Product';

export async function getAll({ offset, limit }) {
  const { rows: rawProducts, count: totalCount } = await
  Product.findAndCountAll({
    offset,
    limit,
  });

  const products = rawProducts.map(({ dataValues }) => ({
    ...dataValues,
  }));

  return {
    rows: products,
    count: totalCount,
  };
}

export async function getRecommended(id) {
  const rawProducts = await Product.findAll({
    where: {
      id: {
        [Op.ne]: id,
      },
    },
    order: Sequelize.literal('random()'),
    limit: 8,
  });

  const products = rawProducts.map(({ dataValues }) => ({
    ...dataValues,
  }));

  return {
    rows: products,
    count: products.length,
  };
}

export async function getNew() {
  const rawProducts = await Product.findAll({
    order: Sequelize.literal('random()'),
    limit: 8,
  });

  const products = rawProducts.map(({ dataValues }) => ({
    ...dataValues,
  }));

  return {
    rows: products,
    count: products.length,
  };
}

export async function getById(id) {
  const result = await Product.findByPk(id, {
    include: [{ model: Phone }],
  });

  return result;
}
