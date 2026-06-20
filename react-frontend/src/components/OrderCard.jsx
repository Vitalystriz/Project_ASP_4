import React, { useState, useEffect, useRef } from 'react';

const OrderItem = ({ orderId, restaurantId, userId, product, onPriceReport, onUpdateRequired }) => {
    const [productDetails, setProductDetails] = useState(null);
    const [isMutating, setIsMutating] = useState(false);
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
                console.error(error);
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

    const handleQuantityUpdate = async (newQuantity) => {
        if (newQuantity < 1) {
            return handleItemRemoval();
        }
        setIsMutating(true);

        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': userId
                },
                body: JSON.stringify({
                    products: [{ productId: product.productId, quantity: newQuantity }]
                })
            });

            if (response.ok) {
                onUpdateRequired();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsMutating(false);
        }
    };

    const handleItemRemoval = async () => {
        setIsMutating(true);
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'user-id': userId
                }
            });

            if (response.ok) {
                onPriceReport(product.productId, 0);
                onUpdateRequired();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsMutating(false);
        }
    };

    if (!productDetails) {
        return (
            <div style={{ padding: '10px', borderTop: '1px solid #ccc', marginTop: '10px' }}>
                <span>Syncing item details...</span>
            </div>
        );
    }

    return (
        <div style={{
            borderTop: '1px solid #ccc',
            marginTop: '10px',
            paddingTop: '10px',
            opacity: isMutating ? 0.6 : 1
        }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: '#e9ecef', borderRadius: '4px' }} />
                <div>
                    <h5 style={{ margin: '0 0 2px 0' }}>{productDetails.name}</h5>
                    <p style={{ margin: '0', color: '#666', fontSize: '0.8rem' }}>{productDetails.description}</p>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>Price: {productDetails.price} ILS</span>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => handleQuantityUpdate(product.quantity - 1)} disabled={isMutating}>-</button>
                    <span>Qty: <strong>{product.quantity}</strong></span>
                    <button onClick={() => handleQuantityUpdate(product.quantity + 1)} disabled={isMutating}>+</button>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: '#555' }}>Subtotal:</div>
                    <div style={{ fontWeight: 'bold', color: '#007bff' }}>{(productDetails.price * product.quantity).toFixed(2)} ILS</div>
                </div>

                <button
                    onClick={handleItemRemoval}
                    disabled={isMutating}
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default function OrderCard({ order, onPriceReport, onUpdateRequired }) {
    const handleLocalPriceReport = (productId, itemTotal) => {
        onPriceReport(productId, itemTotal);
    };

    return (
        <div style={{
            border: '1px solid #007bff',
            padding: '15px',
            margin: '15px 0',
            borderRadius: '6px',
            backgroundColor: '#f8f9fa',
        }}>
            <h4 style={{ margin: 0, paddingBottom: '10px' }}>Active Checkout Invoice</h4>
            <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '10px' }}>
                Order ID: {order.id}
            </div>

            {order.products && order.products.map(product => (
                <OrderItem
                    key={product.productId}
                    orderId={order.id}
                    restaurantId={order.restaurantId}
                    userId={order.userId}
                    product={product}
                    onPriceReport={handleLocalPriceReport}
                    onUpdateRequired={onUpdateRequired}
                />
            ))}
        </div>
    );
}