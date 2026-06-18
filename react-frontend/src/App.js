import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const Restaurants = () => <div className="container mt-5"><h2>Restaurants Dashboard</h2></div>;
const RestaurantPage = () => <div className="container mt-5"><h2>Restaurant Menu Page</h2></div>;
const ProductCard = () => <div className="container mt-5"><h2>Product Details & Recommendations</h2></div>;
const OrderPage = () => <div className="container mt-5"><h2>Current Order / Checkout</h2></div>;
const HistoryOrdersPage = () => <div className="container mt-5"><h2>Order History</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/*epic 1*/}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/*epic 2*/}
        <Route path="/restaurants" element={<ProtectedRoute><Restaurants /></ProtectedRoute>} />
        <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantPage /></ProtectedRoute>} />
        {/*epic 2+3*/}
        <Route path="/restaurant/:id/products" element={<ProtectedRoute><ProductCard /></ProtectedRoute>} />
        {/*epic 3*/}
        <Route path="/orders/:id" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><HistoryOrdersPage /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;