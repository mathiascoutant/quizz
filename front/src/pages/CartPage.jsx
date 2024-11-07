import React, { useEffect, useState } from 'react';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(getCookie('cart')) || [];
        setCart(storedCart);
    }, []);

    const updateQuantity = (item, change) => {
        setCart(prevCart => {
            const index = prevCart.findIndex(i => i.brand === item.brand);
            if (change === 1) {
                if (index > -1) {
                    // Si l'article existe déjà, augmentez la quantité
                    const updatedCart = [...prevCart];
                    updatedCart[index].quantity += 1;
                    return updatedCart;
                } else {
                    // Sinon, ajoutez un nouvel article
                    return [...prevCart, { ...item, quantity: 1 }];
                }
            } else {
                if (index > -1) {
                    // Si l'article existe, diminuez la quantité
                    const updatedCart = [...prevCart];
                    if (updatedCart[index].quantity > 1) {
                        updatedCart[index].quantity -= 1;
                        return updatedCart;
                    } else {
                        // Si la quantité atteint 0, retirez l'article
                        return prevCart.filter((_, i) => i !== index);
                    }
                }
                return prevCart;
            }
        });
    };

    const removeItem = (item) => {
        setCart(prevCart => prevCart.filter(i => i !== item));
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const itemCounts = cart.reduce((acc, item) => {
        acc[item.brand] = item.quantity; // Utilisez 'brand' comme clé et 'quantity' comme valeur
        return acc;
    }, {});

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center">Mon Panier</h1>
            <div className="mt-4">
                {Object.entries(itemCounts).map(([item, count]) => (
                    <div key={item} className="flex justify-between items-center py-2 border-b">
                        <span>{item} ({count})</span>
                        <div className="flex items-center">
                            <button onClick={() => updateQuantity(item, 1)} className="mx-1 bg-blue-500 text-white px-2 rounded">+</button>
                            <button onClick={() => updateQuantity(item, -1)} className="mx-1 bg-red-500 text-white px-2 rounded">-</button>
                            <button onClick={() => removeItem(item)} className="mx-1 text-red-500">🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-between">
                <button onClick={clearCart} className="bg-gray-300 text-black px-4 py-2 rounded">Vider le Panier</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Payer</button>
            </div>
        </div>
    );
};

export default Cart;