import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const fetch = async () => {
    const res = await axios.get("/cart");
    setCart(res.data.items);
  };

  const remove = async (id) => {
    await axios.delete(`/cart/${id}`);
    fetch();
  };

  const placeOrder = async () => {
    await axios.post("/orders");
    alert("Order placed!");
    fetch();
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map(c => (
        <div key={c.product._id}>
          {c.product.name} × {c.quantity}
          <button onClick={() => remove(c.product._id)}>Remove</button>
        </div>
      ))}
      {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
    </div>
  );
};

export default CartPage;
