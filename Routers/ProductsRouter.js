const Products = require('../Models/Product');
const { Router } = require('express');
const router = new Router();

// Get products
router.get('/', async (req, res) => {
    let products = await Products.find();
    res.send(products);
});

module.exports = router;