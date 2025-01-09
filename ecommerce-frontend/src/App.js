// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from './pages/CartContext';
import HomePage from "./pages/HomePage.js";
import Login from "./pages/LoginPage.js";
import Cart from "./pages/CartPage.js";
import Contact from "./pages/ContactPage.js";

const App = () => {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </Router>
    </CartProvider>
  );
};

export default App;