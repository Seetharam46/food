import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const RestaurantsPage = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/customer/restaurants").then(res => setList(res.data));
  }, []);

  return (
    <div>
      <h2>All Restaurants</h2>
      {list.map(r => (
        <div key={r._id} onClick={() => navigate(`/customer/restaurant/${r._id}`)}>
          <h3>{r.name}</h3>
          <p>{r.email}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantsPage;
