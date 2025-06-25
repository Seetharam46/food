// server/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Customer-only
router.post('/', authMiddleware, roleMiddleware('customer'), placeOrder);
router.get('/', authMiddleware, roleMiddleware('customer'), getOrders);

module.exports = router;
