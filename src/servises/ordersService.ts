import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { ProductOrder } from '../models/ProductOrder';

interface ProductWithCount {
  id: string;
  count: number;
}

export const createOrder = async(
  userId: number,
  products: ProductWithCount[],
) => {
  const order = await Order.create({ userId });

  const productIds = products.map((product) => product.id);

  const foundProducts = await Product.findAll({
    where: {
      id: productIds,
    },
  });

  await Promise.all(
    foundProducts.map(async(product) => {
      const productOrder = await ProductOrder.create({
        productId: product.id,
        orderId: order.id,
        count: 0, // Default count to 0
      });
      const matchingProduct = products.find((p) => p.id === product.id);

      if (matchingProduct) {
        productOrder.count = matchingProduct.count;

        await productOrder.save();
      }
    }),
  );

  const fullOrder = await Order.findByPk(order.id, {
    include: [Product],
  });

  return fullOrder;
};

export const getUserOrders = async(userId: number) => {
  const orders = await Order.findAll({
    where: { userId },
    include: [Product],
  });

  return orders;
};
