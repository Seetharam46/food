import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [menu, setMenu] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/customer/restaurants/${id}/menu`)
      .then(res => setMenu(res.data))
      .catch(err => console.error("Failed to load menu", err));
  }, [id]);

  const addToCart = async (productId) => {
    try {
      await axios.post("/cart/add", { productId });
      alert("Added to cart");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Menu</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {menu.map(item => (
          <div
            key={item._id}
            style={{
              width: "220px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/200x150?text=No+Image"}
              alt={item.name}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h4>{item.name}</h4>
            <p style={{ fontSize: "14px", color: "#555" }}>{item.description}</p>
            <p><strong>₹{item.price}</strong></p>
            <button onClick={() => addToCart(item._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
