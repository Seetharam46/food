// server/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const { getApprovedRestaurants, getRestaurantMenu } = require('../controllers/customerController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔐 Customer-only
router.get('/restaurants', authMiddleware, roleMiddleware('customer'), getApprovedRestaurants);
router.get('/restaurants/:id/menu', authMiddleware, roleMiddleware('customer'), getRestaurantMenu);

module.exports = router;
