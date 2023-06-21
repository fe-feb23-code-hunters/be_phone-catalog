import { createOrder, getUserOrders } from '../servises/ordersService';

import { getUserById } from '../servises/authService';

export const getAllOrders = async(req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).send('The user id is invalid');
  }

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(400).send('There is no such user');
    }

    const orders = await getUserOrders(userId);

    if (!orders.length) {
      return res.status(400).send('No orders yet');
    }

    return res.json({
      orders,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error retrieving products:', error);

    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const postOrder = async(req, res) => {
  const userId = req.body.userId;
  const products = req.body.products;

  if (!userId) {
    return res.status(400).send('The user id is invalid');
  }

  if (!products.length) {
    return res
      .status(400)
      .send('You should have at least 1 product to post an order');
  }

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(400).send('There is no such user');
    }

    const order = await createOrder(userId, products);

    if (!order) {
      return res.status(400).send('Not able to post an order');
    }

    return res.json({
      order,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error retrieving products:', error);

    return res.status(500).json({ error: 'Internal server error' });
  }
};
