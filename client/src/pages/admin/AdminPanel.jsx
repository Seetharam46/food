import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/pages/AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (activeTab === 'restaurants') fetchRestaurants();
    else if (activeTab === 'users') fetchUsers();
    else if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/restaurants/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRestaurants(res.data);
    } catch (err) {
      console.error('Failed to load restaurants', err);
    }
  };

  const approveRestaurant = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/restaurants/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Restaurant approved');
      fetchRestaurants();
    } catch (err) {
      console.error('Failed to approve restaurant', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to load users', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to load orders', err);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <div className="admin-tabs">
        <button className={activeTab === 'restaurants' ? 'active' : ''} onClick={() => setActiveTab('restaurants')}>Pending Restaurants</button>
        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Users</button>
        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</button>
      </div>

      <div className="admin-section">
        {activeTab === 'restaurants' && (
          <>
            <h3>Pending Restaurants</h3>
            {restaurants.length === 0 ? <p>No pending approvals</p> : restaurants.map((rest) => (
              <div key={rest._id} className="admin-item">
                <p><strong>{rest.name}</strong> - {rest.email}</p>
                <button onClick={() => approveRestaurant(rest._id)}>Approve</button>
              </div>
            ))}
          </>
        )}

        {activeTab === 'users' && (
          <>
            <h3>Registered Users</h3>
            {users.map((user) => (
              <div key={user._id} className="admin-item">
                <p><strong>{user.name}</strong> ({user.role}) - {user.email}</p>
              </div>
            ))}
          </>
        )}

        {activeTab === 'orders' && (
          <>
            <h3>All Orders</h3>
            {orders.map((order) => (
              <div key={order._id} className="admin-item">
                <p><strong>Customer:</strong> {order.customer?.name || 'Deleted'}</p>
                <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
