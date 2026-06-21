import React from 'react';
import './ProductCard.css';

const ProductCard = ({ item }) => {
  return (
    <div className="product-card" data-id={item._id || item.id}>
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