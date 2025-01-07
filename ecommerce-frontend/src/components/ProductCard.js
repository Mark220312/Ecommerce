import React, { useState } from 'react';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const { id, name, price, image } = product; // Extraer propiedades necesarias
  const [quantity, setQuantity] = useState(0);

  // Función para aumentar la cantidad
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Función para disminuir la cantidad
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Función para agregar al carrito
  const handleAddToCartClick = () => {
    if (quantity > 0) {
      onAddToCart(product, quantity); // Pasa el producto y la cantidad al carrito
      setQuantity(0); // Resetea la cantidad después de agregar
    }
  };

  // Función para abrir el modal al hacer clic en la imagen
  const handleViewDetails = () => {
    onViewDetails(product);
  };

  return (
    <div className={styles.productCard}>
      <img
        src={image}
        alt={name}
        className={styles.productImage}
        onClick={handleViewDetails} // Llama a la función que abre el modal
      />
      <div className={styles.productInfo}>
        <div className={styles.productTitle}>{name}</div>
        <div className={styles.productPrice}>${price}</div>
        <div className={styles.quantityControl}>
          <button className={styles.quantityBtn} onClick={handleDecrease}>
            -
          </button>
          <span className={styles.quantityDisplay}>{quantity}</span>
          <button className={styles.quantityBtn} onClick={handleIncrease}>
            +
          </button>
        </div>
        <button className={styles.addBtn} onClick={handleAddToCartClick}>
        <i class="fas fa-shopping-cart"></i>
        Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
