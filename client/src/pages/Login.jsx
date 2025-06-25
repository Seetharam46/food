import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'customer' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);

      const { token, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      alert('Login successful!');

      // Redirect based on role
      if (role === 'customer') navigate('/customer/home');
      else if (role === 'restaurant') navigate('/restaurant/dashboard');
      else if (role === 'admin') navigate('/admin/panel');
    } catch (err) {
      alert('Login failed. Check credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to QuickBite</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />

          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="restaurant">Restaurant</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
