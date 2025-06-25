// server/routes/restaurantRoutes.js
const express = require('express');
const router = express.Router();
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getRestaurantOrders
} = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔐 All routes below require "restaurant" role
router.post('/products', authMiddleware, roleMiddleware('restaurant'), addProduct);
router.put('/products/:id', authMiddleware, roleMiddleware('restaurant'), updateProduct);
router.delete('/products/:id', authMiddleware, roleMiddleware('restaurant'), deleteProduct);

// 🧾 View orders for this restaurant
router.get('/orders', authMiddleware, roleMiddleware('restaurant'), getRestaurantOrders);

module.exports = router;
