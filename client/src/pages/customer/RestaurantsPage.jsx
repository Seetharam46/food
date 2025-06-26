import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/customer/restaurants")
      .then(res => setRestaurants(res.data))
      .catch(err => {
        console.error("Failed to load restaurants", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Restaurants</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {restaurants.map((r) => (
          <div
            key={r._id}
            onClick={() => navigate(`/customer/restaurant/${r._id}`)}
            style={{
              width: "200px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
              padding: "10px",
              boxShadow: "0 0 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <img
              src={r.imageUrl}
              alt={r.name}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h4 style={{ margin: "10px 0 0" }}>{r.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsPage;
