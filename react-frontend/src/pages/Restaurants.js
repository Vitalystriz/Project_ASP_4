import React from 'react';
import RestaurantCard from '../components/RestaurantCard';
import './Restaurants.css';

const Restaurants = () => {
    const [restaurants, setRestaurants] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/restaurants');
                const data = await response.json();
                setRestaurants(data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    if (loading) {
        return <div className="loading">בטעינה...</div>;
    }

    return (
        <div className="restaurants-container">
            {restaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
    )
};

export default Restaurants;