import React, { useState } from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ isOpen, product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(0);

    if (!isOpen || !product) return null;

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCartClick = () => {
        if (quantity > 0) {
            onAddToCart(product, quantity);
            setQuantity(0); // Reset quantity after adding to cart
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <img src={product.image} alt={product.name} className={styles.modalImage} />
                <h2 className={styles.modalTitle}>{product.name}</h2>
                <p className={styles.modalPrice}>${product.price}</p>
                <p className={styles.modalDescription}>{product.description}</p>
                <div className={styles.quantityControl}>
                    <button className={styles.quantityBtn} onClick={handleDecrease}>-</button>
                    <span className={styles.quantityDisplay}>{quantity}</span>
                    <button className={styles.quantityBtn} onClick={handleIncrease}>+</button>
                </div>
                <button className={styles.addBtn} onClick={handleAddToCartClick}>
                <i class="fas fa-shopping-cart"></i>
                        Agregar al carrito</button>
            </div>
        </div>
    );
};

export default Modal;
