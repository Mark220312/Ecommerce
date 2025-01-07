import React, { useContext } from 'react';
import { CartContext } from '../pages/CartContext'; // Importa el contexto del carrito
import Navbar from '../components/Navbar.js';
import styles from '../styles/CartPage.module.css';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    // Calcular el subtotal
    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    // Calcular el total (ejemplo con $10 de envío)
    const calculateTotal = () => {
        const shippingCost = 10; // Puedes cambiar el costo de envío si es necesario
        return (parseFloat(calculateSubtotal()) + shippingCost).toFixed(2);
    };

    // Aumentar cantidad de un producto
    const handleIncrease = (id) => {
        const item = cart.find((item) => item.id === id);
        if (item) {
            updateQuantity(id, item.quantity + 1);
        }
    };

    // Disminuir cantidad de un producto
    const handleDecrease = (id) => {
        const item = cart.find((item) => item.id === id);
        if (item && item.quantity > 0) {
            updateQuantity(id, item.quantity - 1);
        }
    };

    return (
        <div>
            <Navbar />
            <main className={styles.cartContainer}>
                <div className={styles.cartItems}>
                    {/* Mostrar cada producto en el carrito */}
                    {cart.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            <img src={item.image} alt={item.name} className={styles.cartImage} />
                            <div className={styles.itemDetails}>
                                <div className={styles.itemName}>{item.name}</div>
                                <div className={styles.itemPrice}>${item.price}</div>
                                <div className={styles.quantityControl}>
                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() => handleDecrease(item.id)}
                                    >
                                        -
                                    </button>
                                    <span className={styles.quantityDisplay}>{item.quantity}</span>
                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() => handleIncrease(item.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen del carrito */}
                <div className={styles.cartSummary}>
                    <div className={styles.summaryItem}>
                        <span>Subtotal</span>
                        <span>${calculateSubtotal()}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span>Envío</span>
                        <span>$10.00</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                    </div>
                    <button className={styles.payBtn}>Pagar</button>
                </div>
            </main>
        </div>
    );
};

export default CartPage;
