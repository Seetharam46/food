// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {
  getPendingRestaurants,
  approveRestaurant,
  deleteRestaurant,
} = require('../controllers/adminController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔐 Admin-only access
router.get('/restaurants/pending', authMiddleware, roleMiddleware('admin'), getPendingRestaurants);
router.put('/restaurants/:id/approve', authMiddleware, roleMiddleware('admin'), approveRestaurant);
router.delete('/restaurants/:id', authMiddleware, roleMiddleware('admin'), deleteRestaurant);

module.exports = router;
