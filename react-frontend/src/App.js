import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Restaurants from './pages/Restaurants';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="page-title">כל המסעדות</h1>
        <Restaurants />
      </div>
    </Router>
  );
}

export default App;