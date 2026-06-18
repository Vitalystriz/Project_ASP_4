import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Navbar from './components/Navbar';
import Home from './components/Home';

const Register = () => <div className="container mt-5"><h2>Register Page (Epic 1)</h2></div>;
const Login = () => <div className="container mt-5"><h2>Login Page (Epic 1)</h2></div>;

const Restaurants = () => <div className="container mt-5"><h2>Restaurants Dashboard (Epic 2)</h2></div>;
const RestaurantPage = () => <div className="container mt-5"><h2>Restaurant Menu Page (Epic 2)</h2></div>;

const ProductCard = () => <div className="container mt-5"><h2>Product Details & Recommendations (Epic 2+3)</h2></div>;

const OrderPage = () => <div className="container mt-5"><h2>Current Order / Checkout (Epic 3)</h2></div>;
const HistoryOrdersPage = () => <div className="container mt-5"><h2>Order History (Epic 3)</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/restaurant/:id/products" element={<ProductCard />} />
        <Route path="/orders/:id" element={<OrderPage />} />
        <Route path="/orders" element={<HistoryOrdersPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;