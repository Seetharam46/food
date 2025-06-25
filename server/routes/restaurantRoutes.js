// server/routes/restaurantRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // 👈 handles image upload

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getRestaurantOrders,
} = require('../controllers/restaurantController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔐 All routes below require "restaurant" role

// ✅ Add product with image upload
router.post(
  '/products',
  authMiddleware,
  roleMiddleware('restaurant'),
  upload.single('image'), // 👈 handles multipart/form-data
  addProduct
);

// ✅ Update/Delete product
router.put('/products/:id', authMiddleware, roleMiddleware('restaurant'), updateProduct);
router.delete('/products/:id', authMiddleware, roleMiddleware('restaurant'), deleteProduct);

// ✅ View orders for this restaurant
router.get('/orders', authMiddleware, roleMiddleware('restaurant'), getRestaurantOrders);

module.exports = router;
