const db = require('../database/connection');
const HttpError = require('../utils/httpError');

//get catagory for a store by storeId
const getCategories = async (req, res, next) => {
  const storeId = req.params.storeId;

  let categories;
  try {
    categories = await db
      .select()
      .from('categories')
      .where('store_id', storeId);
  } catch (err) {
    return next(new HttpError('Somting went wrong, could not find store', 404));
  }

  if (categories.length == 0) {
    return next(new HttpError(`Could not find catgories`, 404));
  }

  res.status(200).json({
    error: false,
    total: categories.length,
    data: categories,
  });
};

//add category to the store by store id
const addCategory = async (req, res, next) => {
  const storeId = req.params.storeId;

  const {name, image} = req.body;
  const file = image[0].thumbUrl ? image[0].thumbUrl : '';

  const checkStore = await db
    .select()
    .from('stores')
    .where('s_id', storeId)
    .catch(err => {
      return next(err);
    });

  if (checkStore.length != 0) {
    const id = await db('categories').insert({
      store_id: storeId,
      name: name,
      image: file,
    });

    return res.status(201).json({
      error: false,
      message: 'catagory created succesffuly',
    });
  } else {
    return next(new HttpError(`No store found with id of ${storeId}`, 404));
  }
};

exports.getCategories = getCategories;
exports.addCategory = addCategory;
