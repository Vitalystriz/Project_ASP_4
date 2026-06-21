import React from 'react';
import RestaurantCard from '../components/RestaurantCard';
import './Restaurants.css';

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
        address: ''
    });

    React.useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await fetch('http://localhost:5000/api/restaurants');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                const actualData = Array.isArray(data) ? data : (data.data || []);
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
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.type) {
            alert("Please fill in at least Restaurant Name and Food Type!");
            return;
        }

        const fallbackId = 'res_' + Date.now().toString();
        const localBackup = { _id: fallbackId, id: fallbackId, ...formData };

        try {
            const response = await fetch('http://localhost:5000/api/restaurants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                const savedRestaurant = data._id || data.id ? data : (data.data || localBackup);
                
                setRestaurants(prev => [...prev, savedRestaurant]);
                setFilteredRestaurants(prev => [...prev, savedRestaurant]);
            } else {
                setRestaurants(prev => [...prev, localBackup]);
                setFilteredRestaurants(prev => [...prev, localBackup]);
            }
        } catch (err) {
            console.error('Network/Server error during save:', err);
            setRestaurants(prev => [...prev, localBackup]);
            setFilteredRestaurants(prev => [...prev, localBackup]);
        } finally {
            setFormData({ name: '', type: '', description: '', address: '' });
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
                                <label>Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
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