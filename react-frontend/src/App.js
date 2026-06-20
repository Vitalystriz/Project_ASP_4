// src/App.jsx
import React from 'react';
import OrderPage from './pages/OrderPage';

function App() {
  return (
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fff', minHeight: '100vh' }}>
        <header style={{ backgroundColor: '#212529', color: 'white', padding: '15px' }}>
          <h3 style={{ margin: '0' }}>Wolt</h3>
        </header>
        <main>
          <OrderPage />
        </main>
      </div>
  );
}

export default App;
