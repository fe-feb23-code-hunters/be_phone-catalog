import { Sequelize, Op } from 'sequelize';
import { Phone } from '../models/Phone';
import { Product } from '../models/Product';
import { ProductCategory } from '../types/productCategory';
import { SortBy } from '../types/SortBy';

export async function getAll({
  offset,
  limit,
  productCategory,
  sortBy,
  search,
}) {
  const where: {
    category?: ProductCategory;
    name?: { [Op.iLike]: string }
  } = {};

  let order: Array<[string, 'DESC' | 'ASC']> = [];

  if (productCategory) {
    where.category = productCategory;
  }

  if (search) {
    where.name = { [Op.iLike]: `%${search}%` };
  }

  if (sortBy) {
    switch (sortBy) {
      case SortBy.NEWEST: {
        order = [['year', 'DESC']];
        break;
      }

      case SortBy.OLDEST: {
        order = [['year', 'ASC']];
        break;
      }

      case SortBy.HIGH_PRICE: {
        order = [['price', 'DESC']];
        break;
      }

      case SortBy.LOW_PRICE: {
        order = [['price', 'ASC']];
        break;
      }
    }
  }

  const { rows: rawProducts, count: totalCount }
  = await Product.findAndCountAll({
    where,
    offset,
    limit,
    order,
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
