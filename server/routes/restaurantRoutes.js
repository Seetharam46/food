const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // For image uploads

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getRestaurantOrders,
  updateOrderStatus, // ✅ Include update order status
} = require('../controllers/restaurantController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔐 Restaurant-only routes

// ✅ Add product with image
router.post(
  '/products',
  authMiddleware,
  roleMiddleware('restaurant'),
  upload.single('image'),
  addProduct
);

// ✅ Update product
router.put('/products/:id', authMiddleware, roleMiddleware('restaurant'), updateProduct);

// ✅ Delete product
router.delete('/products/:id', authMiddleware, roleMiddleware('restaurant'), deleteProduct);

// ✅ View restaurant's orders
router.get('/orders', authMiddleware, roleMiddleware('restaurant'), getRestaurantOrders);

// ✅ Update order status
router.put('/orders/:id/status', authMiddleware, roleMiddleware('restaurant'), updateOrderStatus);

module.exports = router;
