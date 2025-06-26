import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const RestaurantsPage = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/customer/restaurants").then((res) => setList(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Restaurants</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {list.map((r) => (
          <div
            key={r._id}
            onClick={() => navigate(`/customer/restaurant/${r._id}`)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={r.imageUrl}
              alt={r.name}
              style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }}
            />
            <h4>{r.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsPage;
