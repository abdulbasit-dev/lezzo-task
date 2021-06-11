const db = require('../database/connection');

const HttpError = require('../utils/httpError');

// return all stores
const getStores = async (req, res, next) => {
  let stores;

  try {
    stores = await db.select().from('stores');
  } catch (err) {
    return next(
      new HttpError('Somting went wrong, could not find stores', 500)
    );
  }

  res.status(200).json({
    error: false,
    total: stores.length,
    data: stores,
    message: null,
  });
};

//return single store by id
const getStore = async (req, res, next) => {
  const storeId = req.params.storeId;

  res.send(storeId);
  return;

  let store;
  try {
    store = await db.select().from('stores').where('s_id', storeId);
  } catch (err) {
    return next(new HttpError('Somting went wrong, could not find store', 404));
  }

  if (store.length == 0) {
    return next(new HttpError(`Could not find place for the provided id`, 404));
  }

  res.status(200).json({
    error: false,
    total: store.length,
    data: store,
    message: null,
  });
};

// create store
const createStore = async (req, res, next) => {
  const {name, image} = req.body;
  const file = image[0].thumbUrl ? image[0].thumbUrl : '';
  try {
    const store = await db('stores').insert({
      name: name,
      logo: file,
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    error: false,
    message: 'store created succesfully',
  });

  return;
};

exports.getStores = getStores;
exports.getStore = getStore;
exports.createStore = createStore;
