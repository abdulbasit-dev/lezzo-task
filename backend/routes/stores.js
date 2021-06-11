const express = require('express');
const router = express.Router();
const categoryRoutes = require('../routes/categories');

const {getStores, getStore, createStore} = require('../controllers/stores');

router.use('/:storeId/categories', categoryRoutes);

router.get('/', getStores);
router.post('/', createStore);
router.get('/:storeId', getStore);

module.exports = router;
