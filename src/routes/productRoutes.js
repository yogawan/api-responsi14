const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, addProduct);

router.get('/', getAllProducts);

module.exports = router;