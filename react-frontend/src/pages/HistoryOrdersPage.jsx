import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderHistoryCard';
import { useNavigate } from 'react-router-dom';

export default function OrderPage() {
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCartCost, setTotalCartCost] = useState(0);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const targetUserId = JSON.parse(localStorage.getItem('user'))?.id;
    console.log(targetUserId)
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

                const activeItems = payload.filter(
                    item => item.status === 'in service' && item.userId === targetUserId
                );

                if (activeItems.length > 0) {
                    setOrders(activeItems)
                } else {
                    setOrders(null);
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




    if (isLoading) return <div style={{ padding: '20px' }}>Syncing cart details...</div>;

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

            {!orders || orders.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>Your active basket is empty.</p>
            ) : (
                <>
                    <div>
                        {orders.map((singleOrder) => (
                            <OrderCard
                                key={singleOrder.id}
                                order={singleOrder}
                            />
                        ))
                        }

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

                    </div>
                </>
            )}
        </div>
    );
}