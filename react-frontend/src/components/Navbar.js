import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Navbar.css';

const Navbar = ({ searchTerm, setSearchTerm, userAddress }) => {
    const location = useLocation();
    const isInsideRestaurant = location.pathname.includes('/restaurant');
    const currentPlaceholder = isInsideRestaurant 
        ? "Search for dishes or drinks..." 
        : "Looking for a specific restaurant/food type?";

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="navbar-address-delivery">
                    <span className="address-icon">📍</span>
                    <div className="address-text">
                        <span className="address-label">Delivering To:</span>
                        <span className="address-value">{userAddress}</span>
                    </div>
                </div>
                <div className="navbar-search-section">
                    <SearchBar 
                        value={searchTerm} 
                        onChange={setSearchTerm} 
                        placeholder={currentPlaceholder} 
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;