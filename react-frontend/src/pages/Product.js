import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Product.css'; // נוודא שקובץ העיצוב מחובר

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const isRecommended = (item) => item && item.price < 40;

    React.useEffect(() => {
        // רשימת המוצרים לבדיקה (Mock Data)
        const mockMenu = [
            // === מסעדה 1: Bakery ===
            { id: 'm1', restaurantId: '1', name: 'Butter Croissant', type: 'Pastry', price: 18, description: 'Flaky, buttery and rich French classic' },
            { id: 'm5', restaurantId: '1', name: 'Iced Latte', type: 'Drinks', price: 15, description: 'Chilled espresso with fresh milk over ice' },
            { id: 'm6', restaurantId: '1', name: 'Chocolate Babka', type: 'Pastry', price: 35, description: 'Sweet braided yeast cake with rich chocolate filling' },

            // === מסעדה 2: Sushi Signature ===
            { id: 'm2', restaurantId: '2', name: 'Salmon Roll', type: 'Sushi', price: 42, description: 'Fresh salmon, avocado, and cucumber topped with sesame' },
            { id: 'm7', restaurantId: '2', name: 'Spicy Tuna Roll', type: 'Sushi', price: 45, description: 'Spicy minced tuna, green onion, and spicy mayo' },
            { id: 'm8', restaurantId: '2', name: 'Veggie Combo', type: 'Sushi', price: 38, description: 'Sweet potato, cucumber, carrot and avocado roll' }, // מומלץ (מתחת ל-40)
            { id: 'm9', restaurantId: '2', name: 'Miso Soup', type: 'Appetizer', price: 16, description: 'Traditional Japanese soup with tofu and seaweed' }, // מומלץ (מתחת ל-40)

            // === מסעדה 3: Pizza Papa ===
            { id: 'm3', restaurantId: '3', name: 'Margherita Pizza', type: 'Pizza', price: 55, description: 'Classic Italian tomato sauce, fresh mozzarella, and basil' },
            { id: 'm10', restaurantId: '3', name: 'Garlic Bread', type: 'Appetizer', price: 22, description: 'Toasted baguette with garlic butter and herbs' }, // מומלץ (מתחת ל-40)

            // === מסעדה 4: Burger Factory ===
            { id: 'm4', restaurantId: '4', name: 'Classic Burger', type: 'Burger', price: 58, description: 'Premium beef patty, lettuce, tomato, and factory sauce' },
            { id: 'm11', restaurantId: '4', name: 'BBQ Bacon Burger', type: 'Burger', price: 65, description: 'Crispy bacon, cheddar cheese, onion rings, and smoky BBQ sauce' },
            { id: 'm12', restaurantId: '4', name: 'French Fries', type: 'Sides', price: 18, description: 'Golden, crispy, perfectly salted thin-cut potatoes' }, // מומלץ (מתחת ל-40)
            { id: 'm13', restaurantId: '4', name: 'Onion Rings', type: 'Sides', price: 24, description: 'Crunchy battered onion rings served with dip' } // מומלץ (מתחת ל-40)
        ];

        // חיפוש המוצר הספציפי לפי ה-ID מה-URL
        const foundProduct = mockMenu.find(item => item.id === id);

        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            setError(true); // אם לא נמצא מוצר, נסמן שגיאה
        }

        setLoading(false);
    }, [id]);

    // React.useEffect(() => {
    //     const fetchProductData = async () => {
    //         try {
    //             setLoading(true);
    //             setError(false);
    //             const response = await fetch(`http://localhost:5000/api/products/${id}`);
    //             if (!response.ok) throw new Error('Product not found');
    //             const data = await response.json();
    //             setProduct(data);
    //         } catch (err) {
    //             console.error('Error fetching product details:', err);
    //             setError(true);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     if (id) fetchProductData();
    // }, [id]);

    if (loading) return <div className="loading">...</div>;
    if (error || !product) return (
        <div className="empty-state-container">
            <h2>Product not found 😕</h2>
            <button className="back-btn" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );

    return (
        <div className="product-details-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <div className="product-details-card">
                <h1 className="product-name">{product.name}</h1>
                {product.type && (
                    <span className="product-type-tag">{product.type}</span>
                )}
                <p className="product-description">{product.description}</p>
                <span className="product-price">₪{product.price}</span>
                {isRecommended(product) && (
                    <div className="recommendation-badge">
                        ⭐ Recommended! Best Value
                    </div>
                )}
                <button className="add-to-order-btn" onClick={() => alert('Added to order!')}>
                    Add to cart+
                </button>
            </div>
        </div>
    );
};

export default Product;