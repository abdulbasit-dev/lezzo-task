const express = require('express');
const router = express.Router({mergeParams: true});

const {getProducts, addProducts} = require('../controllers/products');

router.get('/', getProducts);
router.post('/', addProducts);

module.exports = router;
