// src/components/CartItem.js
import React from 'react';
import './CartItem.css'; 

const CartItem = ({ item, onRemove, onQuantityChange }) => {
    const handleRemove = () => onRemove(item.id);
    const handleQuantityChange = (e) => onQuantityChange(item.id, parseInt(e.target.value, 10));

    return (
        <div className="cart-item">
            <img src={item.img} alt={item.service} />
            <div>
                <h4>{item.service}</h4>
                <p>${item.price.toFixed(2)}</p>
                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                />
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;
