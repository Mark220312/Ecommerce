import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar.js';
import { CartContext } from '../pages/CartContext';
import ProductCard from '../components/ProductCard.js';
import Modal from '../components/Modal.js';
import styles from '../styles/HomePage.module.css';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para los filtros
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Cargar productos desde la API
  useEffect(() => {
    fetch('http://localhost:8080/api/products/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verifica la estructura de los datos
        setProducts(data);
        setFilteredProducts(data); // Inicialmente, todos los productos están visibles
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Función para manejar el cambio en los filtros
  const applyFilters = () => {
    let filtered = products;

    // Filtrar por precio
    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(maxPrice));
    }

    // Filtrar por materiales
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter((product) =>
        selectedMaterials.includes(product.material)
      );
    }

    // Filtrar por categorías
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  };

  // Aplicar filtros cuando cambien los valores
  useEffect(() => {
    applyFilters();
  }, [minPrice, maxPrice, selectedMaterials, selectedCategories]);


  return (
    <>
      <Navbar />
      <div className={styles.mainContent}>
        <aside className={styles.filters}>
          <div className={styles.filterGroup}>
            <h3>Precio</h3>
            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.filterGroup}>
            <h3>Material</h3>
            <div>
              <input
                type="checkbox"
                id="gold"
                checked={selectedMaterials.includes('oro')}
                onChange={() => setSelectedMaterials((prev) =>
                  prev.includes('oro') ? prev.filter((m) => m !== 'oro') : [...prev, 'oro']
                )}
              />
              <label htmlFor="gold">Oro</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="silver"
                checked={selectedMaterials.includes('plata')}
                onChange={() => setSelectedMaterials((prev) =>
                  prev.includes('plata') ? prev.filter((m) => m !== 'plata') : [...prev, 'plata']
                )}
              />
              <label htmlFor="silver">Plata</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="bronze"
                checked={selectedMaterials.includes('bronce')}
                onChange={() => setSelectedMaterials((prev) =>
                  prev.includes('bronce') ? prev.filter((m) => m !== 'bronce') : [...prev, 'bronce']
                )}
              />
              <label htmlFor="bronze">Bronce</label>
            </div>
          </div>
          <div className={styles.filterGroup}>
            <h3>Categoría</h3>
            <div>
              <input
                type="checkbox"
                id="watches"
                checked={selectedCategories.includes('relojes')}
                onChange={() => setSelectedCategories((prev) =>
                  prev.includes('relojes') ? prev.filter((c) => c !== 'relojes') : [...prev, 'relojes']
                )}
              />
              <label htmlFor="watches">Relojes</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="bracelets"
                checked={selectedCategories.includes('brazaletes')}
                onChange={() => setSelectedCategories((prev) =>
                  prev.includes('brazaletes') ? prev.filter((c) => c !== 'brazaletes') : [...prev, 'brazaletes']
                )}
              />
              <label htmlFor="bracelets">Brazaletes</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="rings"
                checked={selectedCategories.includes('anillos')}
                onChange={() => setSelectedCategories((prev) =>
                  prev.includes('anillos') ? prev.filter((c) => c !== 'anillos') : [...prev, 'anillos']
                )}
              />
              <label htmlFor="rings">Anillos</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="necklaces"
                checked={selectedCategories.includes('collares')}
                onChange={() => setSelectedCategories((prev) =>
                  prev.includes('collares') ? prev.filter((c) => c !== 'collares') : [...prev, 'collares']
                )}
              />
              <label htmlFor="necklaces">Collares</label>
            </div>
          </div>
        </aside>
        <main className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(quantity) => addToCart(product, quantity)}
              onViewDetails={handleViewDetails} // Pasar la función aquí
            />
          ))}
        </main>
      </div>
      <Modal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={addToCart} // Pasar la función para agregar productos al carrito
      />
    </>
  );
};

export default Homepage;
