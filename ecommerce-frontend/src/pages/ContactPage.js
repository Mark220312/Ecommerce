import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import styles from '../styles/ContactPage.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} class={styles.form}>
        <h2>Contacto</h2>
        <label>Nombre</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <label>Asunto</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
        />
        <label>Mensaje</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        ></textarea>
        <button type="submit">Enviar</button>
        {success && <p class={styles.success}>¡Mensaje enviado!</p>}
      </form>
    </>
  );
};

export default Contact;