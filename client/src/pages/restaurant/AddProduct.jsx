import React, { useState } from "react";
import axios from "../../api/axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "", description: "", price: "", category: "", image: null
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) =>
      data.append(key, val)
    );

    try {
      await axios.post("/restaurant/products", data);
      alert("Product added");
      setForm({ name: "", description: "", price: "", category: "", image: null });
    } catch (err) {
      alert("Add failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <input name="image" type="file" accept="image/*" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
