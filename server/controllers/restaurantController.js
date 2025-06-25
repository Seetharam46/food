const Product = require('../models/Product');

// Add Product (already done)
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;

    const newProduct = new Product({
      restaurant: req.user.id,
      name,
      description,
      price,
      category,
      imageUrl,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
};

// ✅ Edit Product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Check if product belongs to logged-in restaurant
    if (product.restaurant.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
};

// ✅ Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.restaurant.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await product.deleteOne();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
};
