// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import ProductList from './ProductList';
import list from './data';
import './CartIndex.css'

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(savedCartItems);
    }, []);


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...existingItem, quantity: existingItem.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <ProductList products={list} onAddToCart={addToCart} />
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onRemove={removeFromCart}
                            onQuantityChange={updateQuantity}
                        />
                    ))}
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
};

export default Cart;
