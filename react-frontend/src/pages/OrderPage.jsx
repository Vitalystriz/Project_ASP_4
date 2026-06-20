import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';

export default function OrderPage() {
    const [latestOrder, setLatestOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCartCost, setTotalCartCost] = useState(0);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const targetUserId = "e3eee0dc-e781-4b70-a8ba-527aa3dae103";

    const fetchActiveCartData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': targetUserId
                }
            });

            if (response.ok) {
                const payload = await response.json();

                // Filter keeping only orders with status "created"
                const activeItems = payload.filter(item => item.status === 'created');

                if (activeItems.length > 0) {
                    // Extract strictly the single most recent order from the array
                    const mostRecent = activeItems[activeItems.length - 1];
                    setLatestOrder(mostRecent);
                } else {
                    setLatestOrder(null);
                }
            }
        } catch (error) {
            console.error("Critical error downloading checkout payload:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchActiveCartData();
    }, []);

    const handleCardPriceReport = (orderId, cardSum) => {
        setTotalCartCost(cardSum);
    };

    const executeFinalCheckout = async () => {
        if (!latestOrder) return;
        setIsLoading(true);

        try {
            // Update the status of this specific order directly to "in service"
            const response = await fetch(`http://localhost:5000/api/orders/${latestOrder.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'user-id': targetUserId
                },
                body: JSON.stringify({
                    status: "in service"
                })
            });

            if (response.ok) {
                // Switch application state view to success screens layout
                setIsOrderPlaced(true);
            }
        } catch (error) {
            console.error("Checkout validation failure:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div style={{ padding: '20px' }}>Syncing cart details...</div>;

    // Success Screen Layout visible after placing the order
    if (isOrderPlaced) {
        return (
            <div style={{ padding: '40px', maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', color: '#28a745', marginBottom: '20px' }}>✓</div>
                <h2 style={{ color: '#28a745', marginBottom: '10px' }}>Success!</h2>
                <p style={{ fontSize: '1.2rem', color: '#333' }}>Your order has been received.</p>
                <p style={{ color: '#666' }}>The kitchen is currently processing your transaction payload.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto' }}>
            <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Shopping Cart Terminal</h2>

            {!latestOrder ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>Your active basket is empty.</p>
            ) : (
                <>
                    <div>
                        <OrderCard
                            key={latestOrder.id}
                            order={latestOrder}
                            onPriceReport={handleCardPriceReport}
                            onUpdateRequired={fetchActiveCartData}
                        />
                    </div>

                    <div style={{
                        marginTop: '25px',
                        backgroundColor: '#e9ecef',
                        padding: '20px',
                        borderRadius: '6px',
                        textAlign: 'right'
                    }}>
                        <h3 style={{ margin: '0 0 15px 0' }}>
                            Aggregate Total: <span style={{ color: '#007bff' }}>{totalCartCost.toFixed(2)} ILS</span>
                        </h3>
                        <button
                            onClick={executeFinalCheckout}
                            style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                fontSize: '1rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Confirm & Place Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}