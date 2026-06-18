import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RestaurantCard from './components/RestaurantCard';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px'
      }}>
      </div>
    </Router>
  );
}

export default App;