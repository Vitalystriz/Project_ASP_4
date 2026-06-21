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
        const fetchProductData = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) throw new Error('Product not found');
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProductData();
    }, [id]);

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