import React from 'react';

// Empty component just avoid falling
export default function ProductCard({ productId }) {
    return (
        <div style={{ padding: '5px', background: '#eee', margin: '5px 0' }}>
            [Product Metadata Placeholder for ID: {productId}]
        </div>
    );
}