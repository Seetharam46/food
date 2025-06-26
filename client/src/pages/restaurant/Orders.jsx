import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetch = async () => {
    const res = await axios.get("/restaurant/orders");
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`/restaurant/orders/${id}/status`, { status });
    fetch();
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div>
      <h2>Incoming Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <p><strong>Customer:</strong> {order.customer?.name}</p>
          <ul>
            {order.items.map(i => (
              <li key={i.product._id}>
                {i.product.name} × {i.quantity}
              </li>
            ))}
          </ul>
          <p><strong>Status:</strong> {order.status}</p>
          <select onChange={(e) => updateStatus(order._id, e.target.value)} value={order.status}>
            <option>Placed</option>
            <option>Preparing</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Orders;
