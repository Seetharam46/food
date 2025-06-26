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
    <div style={styles.container}>
      <h2 style={styles.heading}>Explore Restaurants</h2>
      <div style={styles.grid}>
        {restaurants.map((r) => (
          <div
            key={r._id}
            onClick={() => navigate(`/customer/restaurant/${r._id}`)}
            style={styles.card}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.08)";
            }}
          >
            <img
              src={r.imageUrl}
              alt={r.name}
              style={styles.image}
            />
            <h4 style={styles.name}>{r.name}</h4>
            {r.description && <p style={styles.description}>{r.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 60px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f9fbfd",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "#222",
    textAlign: "center",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "center",
  },
  card: {
    width: "240px",
    background: "#fff",
    borderRadius: "12px",
    cursor: "pointer",
    textAlign: "center",
    padding: "15px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "12px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 5px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    padding: "0 10px",
    minHeight: "40px",
  },
};

export default RestaurantsPage;
