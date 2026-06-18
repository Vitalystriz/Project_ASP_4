import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 


const Home = () => <div className="container mt-5"><h2>Home Page</h2><p>Welcome to Volt- World's best delivery app!</p></div>;
const Login = () => <div className="container mt-5"><h2>Login Page</h2></div>;
const Register = () => <div className="container mt-5"><h2>Register Page</h2></div>;
const Restaurant = () => <div className="container mt-5"><h2>Restaurant Menu</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;