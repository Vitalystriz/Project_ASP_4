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
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        type: '',
        price: '',
        description: ''
    });

    // React.useEffect(() => {
    //     const fetchRestaurantData = async () => {
    //         try {
    //             setLoading(true);
    //             setError(false);
    //             const resResponse = await fetch(`http://localhost:5000/api/restaurants/${id}`);
    //             if (!resResponse.ok) throw new Error('Restaurant not found');
    //             const restaurantData = await resResponse.json();
    //             const productsResponse = await fetch(`http://localhost:5000/api/products?restaurantId=${id}`);
    //             if (!productsResponse.ok) throw new Error('Products not found');
    //             const productsData = await productsResponse.json();
    //             const completeData = {
    //                 ...restaurantData,
    //                 menu: productsData
    //             };
    //             setRestaurant(completeData);
    //             setFilteredMenu(completeData.menu);
    //         } catch (err) {
    //             console.error('Error fetching data from server:', err);
    //             setError(true);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     if (id) {
    //         fetchRestaurantData();
    //     }
    // }, [id]);

    React.useEffect(() => {
        const mockRestaurants = [
            { id: '1', name: 'Bakery', type: 'Coffee/Pastries', description: 'Perfect coffee with perfect pastries', address: 'Ibn Gabirol Street, Tel Aviv' },
            { id: '2', name: 'Sushi Signature', type: 'Japanese / Asian', description: 'High-quality sushi with complementary toppings', address: '10 Yedidya Street, Bnei Brak' },
            { id: '3', name: 'Pizza Papa', type: 'Italian / Pizza', description: 'Perfect pizza with Italian flavors', address: '2 Dizengoff Street, Tel Aviv' },
            { id: '4', name: 'Burger Factory', type: 'Meat / American', description: 'Perfect burgers with complementary toppings', address: '42 Herzl Street, Tel Aviv' }
        ];

        const mockMenu = [
            { id: 'm1', restaurantId: '1', name: 'Butter Croissant', type: 'Pastry', price: 18, description: 'Flaky, buttery and rich French classic' },
            { id: 'm5', restaurantId: '1', name: 'Iced Latte', type: 'Drinks', price: 15, description: 'Chilled espresso with fresh milk over ice' },
            { id: 'm6', restaurantId: '1', name: 'Chocolate Babka', type: 'Pastry', price: 35, description: 'Sweet braided yeast cake with rich chocolate filling' },
            { id: 'm2', restaurantId: '2', name: 'Salmon Roll', type: 'Sushi', price: 42, description: 'Fresh salmon, avocado, and cucumber topped with sesame' },
            { id: 'm7', restaurantId: '2', name: 'Spicy Tuna Roll', type: 'Sushi', price: 45, description: 'Spicy minced tuna, green onion, and spicy mayo' },
            { id: 'm8', restaurantId: '2', name: 'Veggie Combo', type: 'Sushi', price: 38, description: 'Sweet potato, cucumber, carrot and avocado roll' },
            { id: 'm9', restaurantId: '2', name: 'Miso Soup', type: 'Appetizer', price: 16, description: 'Traditional Japanese soup with tofu and seaweed' },
            { id: 'm3', restaurantId: '3', name: 'Margherita Pizza', type: 'Pizza', price: 55, description: 'Classic Italian tomato sauce, fresh mozzarella, and basil' },
            { id: 'm10', restaurantId: '3', name: 'Garlic Bread', type: 'Appetizer', price: 22, description: 'Toasted baguette with garlic butter and herbs' },
            { id: 'm4', restaurantId: '4', name: 'Classic Burger', type: 'Burger', price: 58, description: 'Premium beef patty, lettuce, tomato, and factory sauce' },
            { id: 'm11', restaurantId: '4', name: 'BBQ Bacon Burger', type: 'Burger', price: 65, description: 'Crispy bacon, cheddar cheese, onion rings, and smoky BBQ sauce' },
            { id: 'm12', restaurantId: '4', name: 'French Fries', type: 'Sides', price: 18, description: 'Golden, crispy, perfectly salted thin-cut potatoes' },
            { id: 'm13', restaurantId: '4', name: 'Onion Rings', type: 'Sides', price: 24, description: 'Crunchy battered onion rings served with dip' }
        ];

        const foundRestaurant = mockRestaurants.find(r => r.id === id);

        if (foundRestaurant) {
            const menuForRes = mockMenu.filter(item => item.restaurantId === id);
            const completeRestaurantData = {
                ...foundRestaurant,
                menu: menuForRes
            };
            setRestaurant(completeRestaurantData);
            setFilteredMenu(menuForRes);
        } else {
            setError(true);
        }

        setLoading(false);
    }, [id]);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.price) {
            alert("Please fill in at least Product Name and Price!");
            return;
        }
        const newProduct = {
            id: 'm_' + Date.now().toString(),
            restaurantId: id,
            name: formData.name,
            type: formData.type,
            price: Number(formData.price),
            description: formData.description
        };
        setRestaurant(prev => ({
            ...prev,
            menu: [...prev.menu, newProduct]
        }));

        setFormData({ name: '', type: '', price: '', description: '' });
        setIsModalOpen(false);
    };

    if (loading) return <div className="loading">...</div>;
    if (error || !restaurant) return (
        <div className="empty-state-container">
            <h2>No products found 😕</h2>
            <button className="back-btn" onClick={() => navigate('/')}>
                Back to main list
            </button>
        </div>
    );

    return (
        <div className="restaurant-details-page">
            {/* שורת הכותרת המעודכנת שמחזיקה את שני הכפתורים בשמאל ואת שם המסעדה במרכז */}
            <div className="restaurant-header-row">

                {/* מיכל שמאלי המאגד את שני הכפתורים זה לצד זה */}
                <div className="header-buttons-container">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        ← Back
                    </button>
                    <button className="back-btn add-product-btn" onClick={() => setIsModalOpen(true)}>
                        + Add Product
                    </button>
                </div>
                <h1 className="page-title">{restaurant.name}</h1>
            </div>
            <p className="res-details-description">{restaurant.description}</p>
            <h2 className="page-title" style={{ marginTop: '2rem' }}>📋 Menu</h2>
            <div className="menu-list">
                {filteredMenu.length > 0 ? (
                    filteredMenu.map((item) => (
                        <ProductCard key={item._id || item.id} item={item} />
                    ))
                ) : (
                    <div className="loading">
                        No product found 😕
                    </div>
                )}
            </div>
            <button className="back-btn" onClick={() => navigate('/')} style={{ position: 'static', display: 'block', margin: '2rem auto' }}>
                ← Back
            </button>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New Product</h3>
                        <form onSubmit={handleAddProduct}>

                            <div className="modal-form-group">
                                <label>Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Hot Fudge Sundae"
                                    required
                                />
                            </div>

                            <div className="modal-form-group">
                                <label>Category / Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Desserts"
                                />
                            </div>

                            <div className="modal-form-group">
                                <label>Price (ILS) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 28"
                                    required
                                />
                            </div>

                            <div className="modal-form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe the product or ingredients..."
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="modal-cancel-btn" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="modal-submit-btn">
                                    Save Product
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Restaurant;