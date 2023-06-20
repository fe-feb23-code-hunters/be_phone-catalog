import { Order } from '../models/Order';
import { Product } from '../models/Product';

export const createOrder = async(userId: number, productIds: number[]) => {
  const order = await Order.create({ userId });

  const products = await Product.findAll({
    where: {
      id: productIds.map(String),
    },
  });

  await order.$set('products', products);

  const fullOrder = await Order.findByPk(order.id, { include: [Product] });

  return fullOrder;
};

export const getUserOrders = async(userId: number) => {
  const orders = await Order.findAll({
    where: { userId },
    include: [{ model: Product }],
  });

  return orders;
};
