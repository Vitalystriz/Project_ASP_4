import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${item.id || item._id}`);
  };

  return (
    <div 
      className="product-card" 
      data-id={item._id || item.id} 
      onClick={handleClick} 
      style={{ cursor: 'pointer' }}
    >
      <div className="product-card-info">
        {item.type && (
          <span className="product-card-type-tag">{item.type}</span>
        )}
        <h3 className="product-card-name">{item.name}</h3>
        <p className="product-card-desc">{item.description}</p>
        <span className="product-card-price">₪{item.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;