import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetch = async () => {
    const res = await axios.get("/restaurant/products");
    setProducts(res.data);
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/restaurant/products/${id}`);
    fetch();
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td><img src={p.imageUrl} alt="" width={50} /></td>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
