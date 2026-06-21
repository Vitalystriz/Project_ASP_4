import React from 'react';
import RestaurantCard from '../components/RestaurantCard';
import '../styles/Restaurants.css';

// const mockRestaurants = [
//     { id: '1', name: 'Bakery', type: 'Coffee/Pastries', description: 'Perfect coffee with perfect pastries', address: 'Ibn Gabirol Street, Tel Aviv' },
//     { id: '2', name: 'Sushi Signature', type: 'Japanese / Asian', description: 'High-quality sushi with complementary toppings', address: '10 Yedidya Street, Bnei Brak' },
//     { id: '3', name: 'Pizza Papa', type: 'Italian / Pizza', description: 'Perfect pizza with Italian flavors', address: '2 Dizengoff Street, Tel Aviv' },
//     { id: '4', name: 'Burger Factory', type: 'Meat / American', description: 'Perfect burgers with complementary toppings', address: '42 Herzl Street, Tel Aviv' }
// ];

const Restaurants = ({ searchTerm }) => {
    const [restaurants, setRestaurants] = React.useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/restaurants');
                const data = await response.json();
                setRestaurants(data);
                setFilteredRestaurants(data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    // React.useEffect(() => {
    //     setRestaurants(mockRestaurants);
    //     setFilteredRestaurants(mockRestaurants);
    //     setLoading(false);
    // }, []);

    React.useEffect(() => {
        const lowerCaseSearch = (searchTerm || '').toLowerCase().trim();
        
        if (!lowerCaseSearch) {
            setFilteredRestaurants(restaurants);
        } else {
            const filtered = restaurants.filter(restaurant => 
                (restaurant.name && restaurant.name.toLowerCase().includes(lowerCaseSearch)) ||
                (restaurant.type && restaurant.type.toLowerCase().includes(lowerCaseSearch))
            );
            setFilteredRestaurants(filtered);
        }
    }, [searchTerm, restaurants]);

    if (loading) {
        return <div className="loading">...</div>;
    }

    return (
        <>
            <h1 className="page-title">Restaurant List</h1>
            <div className="restaurants-container">
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id || restaurant._id} restaurant={restaurant} />
                    ))
                ) : (
                    <div className="loading">
                        No restaurant found😕
                    </div>
                )}
            </div>
        </>
    );
};

export default Restaurants;