import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Restaurants from './pages/Restaurants';
import Navbar from './components/Navbar';
import './App.css';
import Restaurant from './pages/Restaurant';
import Product from './pages/Product';

function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [userAddress, setUserAddress] = React.useState('Loading address..');

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // להחליף בנתיב המדויק
        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const userData = await response.json();
        if (userData && userData.address) {
          setUserAddress(userData.address);
        } else {
          setUserAddress("No address was set");
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUserAddress("Error fetching address");
      }
    };
    fetchUserProfile();
  }, []);

return (
    <Router>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} userAddress={userAddress} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Restaurants searchTerm={searchTerm} userAddress={userAddress} />} />
          <Route path="/restaurant/:id" element={<Restaurant searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;