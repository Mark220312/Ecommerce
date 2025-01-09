import React, { useState } from 'react';
import styles from '../styles/LoginPage.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authenticate user
    if (formData.email && formData.password.length >= 6) {
      alert('Inicio de sesión exitoso');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <>
    <body className={styles.bodylogin}>
      <div className={styles.logincontainer}>
      <form onSubmit={handleSubmit} class={styles.form}>
        <h2>Iniciar Sesión</h2>
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <label>Contraseña</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button className={styles.buttonsubmit} type="submit"><Link to="/home" className={styles.link}>Ingresar</Link></button>
        {error && <p class={styles.error}>{error}</p>}
      </form>
      </div>
    </body>
    </>
  );
};

export default Login;