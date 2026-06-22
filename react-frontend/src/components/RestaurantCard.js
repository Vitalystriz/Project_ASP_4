import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RestaurantCard.css';

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
                
                {restaurant.description && (
                    <p className="restaurant-description">{restaurant.description}</p>
                )}
                <p className="restaurant-address">Coordinates: ({restaurant.x}, {restaurant.y})</p>
                {restaurant.distance !== undefined && (
                    <div className="restaurant-distance" style={{ marginTop: '8px', fontWeight: 'bold', color: '#009de0' }}>
                        🛵 {restaurant.distance} units away
                    </div>
                )}
            </div>
        </div>
    );
}

export default RestaurantCard;