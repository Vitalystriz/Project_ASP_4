import React, { useState, useEffect, useRef } from 'react';

const OrderHistoryItem = ({ restaurantId, userId, product, onPriceReport }) => {
    const [productDetails, setProductDetails] = useState(null);
    const reportedPriceRef = useRef(0);

    useEffect(() => {
        const syncProductMetadata = async () => {
            if (!restaurantId || !product.productId || !userId) return;

            try {
                const response = await fetch(
                    `http://localhost:5000/api/restaurants/${restaurantId}/products/${product.productId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'user-id': userId
                        }
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setProductDetails(data);
                    const initialSubtotal = data.price * product.quantity;
                    reportedPriceRef.current = initialSubtotal;
                    onPriceReport(product.productId, initialSubtotal);
                }
            } catch (error) {
                console.error("Error connection to API:", error);
            }
        };

        syncProductMetadata();
    }, [restaurantId, product.productId, userId]);

    useEffect(() => {
        if (productDetails) {
            const currentSubtotal = productDetails.price * product.quantity;
            if (reportedPriceRef.current !== currentSubtotal) {
                reportedPriceRef.current = currentSubtotal;
                onPriceReport(product.productId, currentSubtotal);
            }
        }
    }, [product.quantity, productDetails, product.productId, onPriceReport]);

    if (!productDetails) {
        return (
            <div style={{ padding: '10px', borderTop: '1px solid #ccc', marginTop: '10px', color: '#666' }}>
                <span>sync...</span>
            </div>
        );
    }

    return (
        <div style={{
            borderTop: '1px solid #eee',
            marginTop: '10px',
            paddingTop: '10px'
        }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                    <h5 style={{ margin: '0 0 2px 0', color: '#333' }}>{productDetails.name}</h5>
                    <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '0.8rem' }}>{productDetails.description}</p>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Price: {productDetails.price} ILS</span>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fdfdfd',
                padding: '4px 8px',
                borderRadius: '4px'
            }}>

                <div style={{ fontSize: '0.9rem', color: '#444' }}>
                    Quantity: <strong>{product.quantity} </strong>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#777' }}>Price:</div>
                    <div style={{ fontWeight: 'bold', color: '#28a745' }}>
                        {(productDetails.price * product.quantity).toFixed(2)} ILS
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function OrderHistoryCard({ order, onPriceReport }) {
    return (
        <div style={{
            border: '1px solid #28a745',
            padding: '20px',
            margin: '20px 0',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, color: '#333' }}>Handling order</h4>
                <span style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                }}>
                    {order.status}
                </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '15px' }}>
                ID order: {order.id}
            </div>

            {order.products && order.products.map(product => (
                <OrderHistoryItem
                    key={product.productId}
                    restaurantId={order.restaurantId}
                    userId={order.userId}
                    product={product}
                    onPriceReport={(prodId, itemTotal) => onPriceReport(order.id, prodId, itemTotal)}
                />
            ))}
        </div>
    );
}