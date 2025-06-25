import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AdminPanel from './pages/admin/AdminPanel';
// import CustomerHome from './pages/customer/CustomerHome';
// import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';

const CustomerHome = () => <h2>Welcome Customer!</h2>;
const RestaurantDashboard = () => <h2>Restaurant Dashboard</h2>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
