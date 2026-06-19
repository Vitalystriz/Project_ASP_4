import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Volt_Logo.png'; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState({ name: '', avatar: '' });
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    
    setIsLoggedIn(!!token);

    if (token && userString) {
        const user = JSON.parse(userString);
        setUserData({
            name: user.displayName || user.username || 'User',
            avatar: user.profilePic ? `http://localhost:5000/uploads/${user.profilePic}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        });
    }
  }, [location]);

  useEffect(() => {
      if (theme === 'dark') {
          document.body.classList.add('bg-dark', 'text-light');
          document.body.classList.remove('bg-light', 'text-dark');
      } else {
          document.body.classList.add('bg-light', 'text-dark');
          document.body.classList.remove('bg-dark', 'text-light');
      }
  }, [theme]);

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/login');
  };

  const toggleTheme = () => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-secondary' : 'navbar-dark bg-dark'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Volt Logo" height="40" className="d-inline-block align-top" />
        </Link>
        
        <div className="collapse navbar-collapse d-flex justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/restaurants">Restaurants</Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <Link className="btn btn-warning btn-sm me-4 fw-bold" to="/orders">
                  🛒 Go to Cart
                </Link>
                <img src={userData.avatar} alt="Avatar" className="rounded-circle me-2" style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                <span className="text-light me-3">{userData.name}</span>
                
                <button className="btn btn-outline-info btn-sm me-3" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>

                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light btn-sm me-2" to="/login">Login</Link>
                <Link className="btn btn-primary btn-sm me-3" to="/register">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;