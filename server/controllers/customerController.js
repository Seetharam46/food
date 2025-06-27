// server/controllers/customerController.js
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order'); // ⬅️ Add this

// ✅ Fetch all approved restaurants
const getApprovedRestaurants = async (req, res) => {
  try {
    const restaurants = await User.find({ role: 'restaurant', approved: true }).select('-password');
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch restaurants', error: err.message });
  }
};

// ✅ Fetch menu/products of a selected restaurant
const getRestaurantMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.find({ restaurant: id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch menu', error: err.message });
  }
};


// ✅ Customer Order History
const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate('items.product', 'name price imageUrl')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};
const searchProducts = async (req, res) => {
  const { keyword } = req.query;

  try {
    const regex = new RegExp(keyword, 'i');

    const restaurants = await User.find({
      role: 'restaurant',
      name: regex,
      approved: true,
    }).select('_id');

    const restaurantIds = restaurants.map((r) => r._id);

    const products = await Product.find({
      $or: [
        { name: regex },
        { category: regex },
        { restaurant: { $in: restaurantIds } },
      ],
    }).populate('restaurant', 'name');

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};

exports.getApprovedRestaurants = async (req, res) => {
  try {
    const restaurants = await User.find({
      role: "restaurant",
      approved: true,
    }).select("name imageUrl _id"); // ✅ select name, imageUrl, id ONLY

    res.status(200).json(restaurants);
  } catch (err) {
    console.error("Error fetching restaurants:", err);
    res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};

module.exports = {
  getApprovedRestaurants,
  getRestaurantMenu,
  getCustomerOrders,
  getCustomerOrders,
  searchProducts,
};
