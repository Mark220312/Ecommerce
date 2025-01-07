import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import styles from '../styles/LoginPage.module.css';

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
      <Navbar />
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
        <button type="submit">Ingresar</button>
        {error && <p class={styles.error}>{error}</p>}
      </form>
    </>
  );
};

export default Login;