import React from 'react';
import logo from '../assets/Volt_Logo.png'; 

const Home = () => {
  return (
    <div className="container mt-5 d-flex flex-column align-items-center text-center">
      <img 
        src={logo} 
        alt="Volt Logo" 
        style={{ width: '500px', marginBottom: '30px', mixBlendMode: 'multiply' }}
      />
      
      <h1 className="display-3 fw-bold mb-3">Welcome to Volt!</h1>
      
      <p className="lead fs-2 text-muted">
        World's best delivery app
      </p>
    </div>
  );
};

export default Home;