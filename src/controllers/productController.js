const Product = require('../models/productModel');

const addProduct = async (req, res) => {
  try {
    const db = req.db;
    const { name, description, price, category, stock } = req.body;
    const userId = req.user.userId; // ID pengguna yang menambahkan produk (dari JWT)

    const newProduct = new Product({ name, description, price, category, stock, userId });
    const result = await db.collection('products').insertOne(newProduct);

    res.status(201).json({ message: 'Product added successfully', productId: result.insertedId });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Failed to add product');
  }
};

const getAllProducts = async (req, res) => {
  try {
    const db = req.db;
    const products = await db.collection('products').find().toArray();

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Failed to fetch products');
  }
};

module.exports = { addProduct, getAllProducts };
