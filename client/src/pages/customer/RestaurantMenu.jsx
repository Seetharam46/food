import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [menu, setMenu] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/customer/restaurants/${id}/menu`).then(res => setMenu(res.data));
  }, [id]);

  const addToCart = async (productId) => {
    await axios.post("/cart/add", { productId });
    alert("Added to cart");
  };

  return (
    <div>
      <h2>Menu</h2>
      {menu.map(item => (
        <div key={item._id}>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p>₹{item.price}</p>
          <button onClick={() => addToCart(item._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
