import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ item, addToOrder }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/product/${item.id || item._id}');
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (addToOrder) {
      addToOrder(item);
    } else {
      alert(`Added ${item.name} to order!`);
    }
  };

  return (
      <div
          className="product-card"
          data-id={item._id || item.id}
          onClick={handleClick}>
        <div className="product-card-info">
          {item.type && (
              <span className="product-card-type-tag">{item.type}</span>
          )}
          <h3 className="product-card-name">{item.name}</h3>
          <p className="product-card-desc">{item.description}</p>
          <div className="product-card-footer">
            <span className="product-card-price">₪{item.price}</span>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;