const db = require('../database/connection');
const HttpError = require('../utils/httpError');

//get products by store_id and category_id
const getProducts = async (req, res, next) => {
  const {categoryId, storeId} = req.params;

  let products;
  try {
    products = await db
      .select()
      .from('products')
      .where({category_id: categoryId, store_id: storeId});
  } catch (err) {
    return next(
      new HttpError('Somting went wrong, could not find products', 500)
    );
  }

  if (products.length == 0) {
    return next(
      new HttpError(
        'Could not find products for the provided provide store_id or catgeory_id.',
        404
      )
    );
  }

  res.status(200).json({
    error: false,
    total: products.length,
    data: products,
  });
};

//create product by passing store_id and category_id
const addProduct = async (req, res, next) => {
  const {categoryId, storeId} = req.params;
  const {name, price, price_type, image} = req.body;
  const file = image[0].thumbUrl ? image[0].thumbUrl : '';

  const checkStore = await db
    .select()
    .from('stores')
    .where('s_id', storeId)
    .catch(err => {
      return next(err);
    });

  const checkCategory = await db
    .select()
    .from('categories')
    .where('c_id', categoryId)
    .catch(err => {
      return next(err);
    });

  if (checkStore.length != 0) {
    if (checkCategory.length != 0) {
      const product = await db('products')
        .insert({
          store_id: storeId,
          category_id: categoryId,
          name: name,
          image: file,
          price: price,
          price_type: price_type,
        })
        .catch(err => {
          return next(err);
        });

      return res.status(201).json({
        error: false,
        message: 'catagory created succesffuly',
      });
    } else {
      return next(
        new HttpError(`No category found with id of ${categoryId}`, 404)
      );
    }
  } else {
    return next(new HttpError(`No store found with id of ${storeId}`, 404));
  }
};

exports.getProducts = getProducts;
exports.addProducts = addProduct;
