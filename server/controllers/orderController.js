const Cart = require('../models/Cart');
const Order = require('../models/Order');

// ✅ Place a new order from cart
const placeOrder = async (req, res) => {
  const customerId = req.user.id;

  try {
    const cart = await Cart.findOne({ customer: customerId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }));

    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      customer: customerId,
      items: orderItems,
      totalAmount
    });

    // Clear the cart after placing the order
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

// ✅ View customer order history
const getCustomerOrders = async (req, res) => {
  const customerId = req.user.id;

  try {
    const orders = await Order.find({ customer: customerId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

module.exports = {
  placeOrder,
  getCustomerOrders
};
