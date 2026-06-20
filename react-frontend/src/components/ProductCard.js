import React from 'react';
import './ProductCard.css';

const ProductCard = ({ item }) => {
  return (
    <div className="product-card">
      {item.image && (
        <img src={item.image} alt={item.name} className="product-card-img" />
      )}
      <div className="product-card-info">
        <h3 className="product-card-name">{item.name}</h3>
        <p className="product-card-desc">{item.description}</p>
        <span className="product-card-price">₪{item.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;