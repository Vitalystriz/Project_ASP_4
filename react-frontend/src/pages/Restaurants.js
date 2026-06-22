import React from 'react';
import RestaurantCard from '../components/RestaurantCard';
import '../styles/Restaurants.css';

const Restaurants = ({ searchTerm }) => {
    const [restaurants, setRestaurants] = React.useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    
    const [formData, setFormData] = React.useState({
        name: '',
        type: '',
        description: '',
        x: '',
        y: ''
    });

    // 1. שליפת מיקום המשתמש הנוכחי
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const targetUserId = user?.id;
    const userX = user?.x !== undefined ? parseFloat(user.x) : null;
    const userY = user?.y !== undefined ? parseFloat(user.y) : null;

    React.useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                setError(false);
                
                // קריאה רגילה לשרת
                const response = await fetch('http://localhost:5000/api/restaurants');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                let actualData = Array.isArray(data) ? data : (data.data || []);

                // 2. חישוב מרחק ומיון ישירות בפרונט-אנד במידה ויש מיקום משתמש
                if (userX !== null && userY !== null) {
                    actualData = actualData.map(restaurant => {
                        const restX = parseFloat(restaurant.x) || 0;
                        const restY = parseFloat(restaurant.y) || 0;
                        const distance = Math.sqrt(
                            Math.pow(userX - restX, 2) + Math.pow(userY - restY, 2)
                        );
                        return {
                            ...restaurant,
                            distance: parseFloat(distance.toFixed(2))
                        };
                    });

                    // מיון מהקרוב לרחוק
                    actualData.sort((a, b) => a.distance - b.distance);
                }

                setRestaurants(actualData);
                setFilteredRestaurants(actualData);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, [userX, userY]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.type || formData.x === '' || formData.y === '') {
            alert("Please fill in Restaurant Name, Food Type and Coordinates!");
            return;
        }

        const fallbackId = 'res_' + Date.now().toString();
        const preparedData = {
            name: formData.name,
            type: formData.type,
            description: formData.description,
            x: parseFloat(formData.x),
            y: parseFloat(formData.y)
        };
        const localBackup = { _id: fallbackId, id: fallbackId, ...preparedData };

        try {
            const response = await fetch('http://localhost:5000/api/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': targetUserId
                },
                body: JSON.stringify(preparedData)
            });

            if (response.ok) {
                const data = await response.json();
                const savedRestaurant = data._id || data.id ? data : (data.data || localBackup);

                // עדכון הרשימה המקומית עם חישוב מרחק למסעדה החדשה
                let updatedList = [...restaurants, savedRestaurant];
                if (userX !== null && userY !== null) {
                    updatedList = updatedList.map(r => {
                        const distance = Math.sqrt(Math.pow(userX - (parseFloat(r.x) || 0), 2) + Math.pow(userY - (parseFloat(r.y) || 0), 2));
                        return { ...r, distance: parseFloat(distance.toFixed(2)) };
                    });
                    updatedList.sort((a, b) => a.distance - b.distance);
                }

                setRestaurants(updatedList);
                setFilteredRestaurants(updatedList);
            } else {
                setRestaurants(prev => [...prev, localBackup]);
                setFilteredRestaurants(prev => [...prev, localBackup]);
            }
        } catch (err) {
            console.error('Network/Server error during save:', err);
            setRestaurants(prev => [...prev, localBackup]);
            setFilteredRestaurants(prev => [...prev, localBackup]);
        } finally {
            setFormData({ name: '', type: '', description: '', x: '', y: '' });
            setIsModalOpen(false);
            setError(false);
        }
    };

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

    if (loading) return <div className="loading">...</div>;

    return (
        <div className="restaurants-page-wrapper">
            <div className="restaurants-header-row">
                <button className="back-btn" onClick={() => setIsModalOpen(true)}>
                    + Create Restaurant
                </button>
                <h1 className="page-title">Restaurant List</h1>
            </div>

            <div className="restaurants-container">
                {error && restaurants.length === 0 ? (
                    <div className="loading">Failed to load restaurants 😕</div>
                ) : filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map(restaurant => (
                        <RestaurantCard key={restaurant._id || restaurant.id} restaurant={restaurant} />
                    ))
                ) : (
                    <div className="loading">No restaurant found 😕</div>
                )}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Create New Restaurant</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-form-group">
                                <label>Restaurant Name *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="modal-form-group">
                                <label>Food Type *</label>
                                <input type="text" name="type" value={formData.type} onChange={handleInputChange} required />
                            </div>
                            <div className="modal-form-group">
                                <label>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} />
                            </div>
                            <div className="modal-form-group">
                                <label>Coordinate X *</label>
                                <input type="number" step="any" name="x" value={formData.x} onChange={handleInputChange} required />
                            </div>
                            <div className="modal-form-group">
                                <label>Coordinate Y *</label>
                                <input type="number" step="any" name="y" value={formData.y} onChange={handleInputChange} required />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="modal-cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="modal-submit-btn">Save Restaurant</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Restaurants;