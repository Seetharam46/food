// server/controllers/adminController.js
const User = require('../models/User');

// Get all pending restaurants
const getPendingRestaurants = async (req, res) => {
  try {
    const pending = await User.find({ role: 'restaurant', approved: false });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending restaurants' });
  }
};

// Approve a restaurant
const approveRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await User.findById(id);
    if (!restaurant || restaurant.role !== 'restaurant') {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurant.approved = true;
    await restaurant.save();
    res.json({ message: 'Restaurant approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Approval failed' });
  }
};

// Delete a restaurant (reject)
const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await User.findById(id);
    if (!restaurant || restaurant.role !== 'restaurant') {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await restaurant.deleteOne();
    res.json({ message: 'Restaurant deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed' });
  }
};

module.exports = {
  getPendingRestaurants,
  approveRestaurant,
  deleteRestaurant,
};
