import { getAll } from '../servises/productModel';

export const getAllProducts = async(req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (limit < 0) {
    return res.status(400).send('Limit should be min 1');
  }

  const offset = (page - 1) * limit;

  try {
    const { rows: products, count } = await getAll({ offset, limit });

    const totalPages = Math.ceil(count / limit);

    if (page <= 0 || page > totalPages) {
      return res
        .status(400)
        .send(`The page index should be between min: 1 and max: ${totalPages}`);
    }

    return res.json({
      products,
      page,
      totalPages,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error retrieving products:', error);

    return res.status(500).json({ error: 'Internal server error' });
  }
};
