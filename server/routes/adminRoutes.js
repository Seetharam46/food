// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {
  getPendingRestaurants,
  approveRestaurant,
  deleteRestaurant,
  getAllOrders, // 👈 new controller
} = require('../controllers/adminController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔐 Admin-only routes
router.get('/restaurants/pending', authMiddleware, roleMiddleware('admin'), getPendingRestaurants);
router.put('/restaurants/:id/approve', authMiddleware, roleMiddleware('admin'), approveRestaurant);
router.delete('/restaurants/:id', authMiddleware, roleMiddleware('admin'), deleteRestaurant);

// 🧾 View all orders
router.get('/orders', authMiddleware, roleMiddleware('admin'), getAllOrders);

module.exports = router;
