import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../pages/CartContext'; // Importa el contexto
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { getTotalItems } = useContext(CartContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.link}>Productos</Link>
        <Link to="/contacto" className={styles.link}>Contacto</Link>
      </div>
      <div className={styles.cartIcon}>
        <Link to="/carrito">
          <i className="fas fa-shopping-cart"></i>
          <span className={styles.cartCount}>{getTotalItems()}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;