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
                setError(false);
            } catch (err) {
                console.error('Error fetching data from server:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantData();
    }, [id]);

    // React.useEffect(() => {
    //     const fetchRestaurantData = async () => {
    //         try {
    //             const mockRestaurants = [
    //                 { id: '1', name: 'Bakery', type: 'Coffee/Pastries', description: 'Perfect coffee with perfect pastries', address: 'Ibn Gabirol Street, Tel Aviv', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800' },
    //                 { id: '2', name: 'Sushi Signature', type: 'Japanese / Asian', description: 'High-quality sushi with complementary toppings', address: '10 Yedidya Street, Bnei Brak', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800' },
    //                 { id: '3', name: 'Pizza Papa', type: 'Italian / Pizza', description: 'Perfect pizza with Italian flavors', address: '2 Dizengoff Street, Tel Aviv', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800' },
    //                 { id: '4', name: 'Burger Factory', type: 'Meat / American', description: 'Perfect burgers with complementary toppings', address: '42 Herzl Street, Tel Aviv', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800' }
    //             ];
    //             const foundRestaurant = mockRestaurants.find(r => r.id === id);
    //             if (!foundRestaurant) {
    //                 setError(true);
    //             } else {
    //                 const mockData = {
    //                     ...foundRestaurant,
    //                     menu: foundRestaurant.id === '1' ? [
    //                         { id: 'm1', name: 'Classic Butter Croissant', price: 18, description: 'Flaky and rich with authentic French butter', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
    //                         { id: 'm2', name: 'Salmon & Cream Cheese Sandwich', price: 34, description: 'Smoked salmon, premium cream cheese, dill, and green onions', image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=400' }
    //                     ] : foundRestaurant.id === '2' ? [
    //                         { id: 'm1', name: 'Salmon Avocado Roll', price: 42, description: 'Fresh salmon, avocado, and cucumber wrapped in sesame seeds', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400' },
    //                         { id: 'm2', name: 'Double Sushi Combo', price: 119, description: 'A premium selection of hot and cold rolls, nigiri, and sashimi', image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400' }
    //                     ] : foundRestaurant.id === '3' ? [
    //                         { id: 'm1', name: 'Classic Margherita Pizza', price: 55, description: 'Italian tomato sauce, 100% mozzarella, and fresh basil leaves', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400' },
    //                         { id: 'm2', name: 'Crispy Pepperoni Pizza', price: 62, description: 'Mozzarella, rich tomato sauce, and crispy beef pepperoni slices', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400' }
    //                     ] : [
    //                         { id: 'm1', name: 'Classic Burger 220g', price: 58, description: 'Premium beef patty, lettuce, tomato, onion, and signature garlic mayo', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
    //                         { id: 'm2', name: 'Giant Crispy Fries', price: 18, description: 'Golden, crispy French fries tossed in our secret homemade spice blend', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400' }
    //                     ]
    //                 };

    //                 setRestaurant(mockData);
    //                 setFilteredMenu(mockData.menu);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //             setError(true);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchRestaurantData();
    // }, [id]);

    React.useEffect(() => {
        if (!restaurant) return;

        const lowerCaseSearch = (searchTerm || '').toLowerCase().trim();
        if (!lowerCaseSearch) {
            setFilteredMenu(restaurant.menu);
        } else {
            const filtered = restaurant.menu.filter(item => 
                (item.name && item.name.toLowerCase().includes(lowerCaseSearch)) ||
                (item.description && item.description.toLowerCase().includes(lowerCaseSearch))
            );
            setFilteredMenu(filtered);
        }
    }, [searchTerm, restaurant]);

    if (loading) return <div className="loading">Loading restaurant menu...</div>;
    if (error || !restaurant) return (
        <div className="loading">
            <h2>Restaurant not found😕</h2>
            <button className="back-btn" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>Back to main list</button>
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
                        <ProductCard key={item.id} item={item} />
                    ))
                ) : (
                    <div className="loading" style={{ fontSize: '1.2rem', color: '#70757a', gridColumn: '1 / -1' }}>
                        No dishes match your search😕
                    </div>
                )}
            </div>
        </div>
    );
};

export default Restaurant;