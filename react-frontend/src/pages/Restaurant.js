import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Restaurant.css';

const Restaurant = ({ searchTerm }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = React.useState(null);
    const [filteredMenu, setFilteredMenu] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                setLoading(true);
                setError(false);

                const resResponse = await fetch(`http://localhost:5000/api/restaurants/${id}`);
                if (!resResponse.ok) throw new Error('Restaurant not found');
                const restaurantData = await resResponse.json();
                const productsResponse = await fetch(`http://localhost:5000/api/products?restaurantId=${id}`);
                if (!productsResponse.ok) throw new Error('Products not found');
                const productsData = await productsResponse.json();
                const completeData = {
                    ...restaurantData,
                    menu: productsData
                };

                setRestaurant(completeData);
                setFilteredMenu(completeData.menu);
            } catch (err) {
                console.error('Error fetching data from server:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRestaurantData();
        }
    }, [id]);

    // React.useEffect(() => {
    //     const mockRestaurants = [
    //         { id: '1', name: 'Bakery', type: 'Coffee/Pastries', description: 'Perfect coffee with perfect pastries', address: 'Ibn Gabirol Street, Tel Aviv' },
    //         { id: '2', name: 'Sushi Signature', type: 'Japanese / Asian', description: 'High-quality sushi with complementary toppings', address: '10 Yedidya Street, Bnei Brak' },
    //         { id: '3', name: 'Pizza Papa', type: 'Italian / Pizza', description: 'Perfect pizza with Italian flavors', address: '2 Dizengoff Street, Tel Aviv' },
    //         { id: '4', name: 'Burger Factory', type: 'Meat / American', description: 'Perfect burgers with complementary toppings', address: '42 Herzl Street, Tel Aviv' }
    //     ];

    //     const mockMenu = [
    //         { id: 'm1', restaurantId: '1', name: 'Butter Croissant', type: 'Pastry', price: 18, description: 'Flaky and rich' },
    //         { id: 'm2', restaurantId: '2', name: 'Salmon Roll', type: 'Sushi', price: 42, description: 'Fresh salmon and avocado' },
    //         { id: 'm3', restaurantId: '3', name: 'Margherita', type: 'Pizza', price: 55, description: 'Classic Italian tomato and cheese' },
    //         { id: 'm4', restaurantId: '4', name: 'Classic Burger', type: 'Burger', price: 58, description: 'Premium beef patty' }
    //     ];

    //     const foundRestaurant = mockRestaurants.find(r => r.id === id);
        
    //     if (foundRestaurant) {
    //         const menuForRes = mockMenu.filter(item => item.restaurantId === id);
    //         setRestaurant(foundRestaurant);
    //         setFilteredMenu(menuForRes);
    //     }
        
    //     setLoading(false);
    // }, [id]);

    React.useEffect(() => {
        if (!restaurant || !restaurant.menu) return;

        const lowerCaseSearch = (searchTerm || '').toLowerCase().trim();
        if (!lowerCaseSearch) {
            setFilteredMenu(restaurant.menu);
        } else {
            const filtered = restaurant.menu.filter(item =>
                (item.name && item.name.toLowerCase().includes(lowerCaseSearch)) ||
                (item.description && item.description.toLowerCase().includes(lowerCaseSearch)) ||
                (item.type && item.type.toLowerCase().includes(lowerCaseSearch))
            );
            setFilteredMenu(filtered);
        }
    }, [searchTerm, restaurant]);

    if (loading) return <div className="loading">Loading restaurant menu...</div>;
    if (error || !restaurant) return (
        <div className="empty-state-container">
            <h2>No products found 😕</h2>
            <button className="back-btn" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
                Back to main list
            </button>
        </div>
    );

    return (
        <div className="restaurant-details-page" style={{ direction: 'ltr', textAlign: 'left' }}>
            <button className="back-btn" onClick={() => navigate('/')}>
                ← Back to main list
            </button>
            <p className="res-details-description">{restaurant.description}</p>
            <h2 className="menu-title">📋 Menu</h2>

            <div className="menu-list">
                {filteredMenu.length > 0 ? (
                    filteredMenu.map((item) => (
                        <ProductCard key={item._id || item.id} item={item} />
                    ))
                ) : (
                    <div className="empty-state-container">
                        No dishes match your search 😕
                    </div>
                )}
            </div>
        </div>
    );
};

export default Restaurant;