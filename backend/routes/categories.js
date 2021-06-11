const express = require('express');
const router = express.Router({mergeParams: true});
const productsRoutes = require('../routes/products');

const {getCategories, addCategory} = require('../controllers/categories');

router.use('/:categoryId/products', productsRoutes);

//all store category
router.get('/', getCategories);
router.post('/', addCategory);

module.exports = router;
