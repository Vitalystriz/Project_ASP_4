import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };

    return (
        <div className="restaurant-card" onClick={handleCardClick}>
            <div className="restaurant-info">
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <p className="restaurant-type">{restaurant.type}</p>
                <p className="restaurant-description">{restaurant.description}</p>
                <p className="restaurant-address">{restaurant.address}</p>
            </div>
        </div>
    );
}

export default RestaurantCard;