import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/customer/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(o => (
        <div key={o._id}>
          <p>Status: {o.status} | ₹{o.totalAmount}</p>
          <ul>
            {o.items.map(i => (
              <li key={i.product._id}>{i.product.name} × {i.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
