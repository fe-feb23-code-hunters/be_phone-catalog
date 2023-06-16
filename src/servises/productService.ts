import { Sequelize, Op } from 'sequelize';
import { Phone } from '../models/Phone';
import { Product } from '../models/Product';
import { ProductCategory } from '../types/productCategory';

export async function getAll({ offset, limit, productCategory }) {
  const where: { category?: ProductCategory } = {};

  if (productCategory) {
    where.category = productCategory;
  }

  const { rows: rawProducts, count: totalCount }
    = await Product.findAndCountAll({
      where,
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
    order: [['year', 'DESC']],
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

export async function getWithDiscount() {
  const rawProducts = await Product.findAll({
    order: [['price', 'ASC']],
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
