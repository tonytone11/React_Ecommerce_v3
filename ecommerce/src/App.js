import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import './App.css';

const App = () => {
  // Initialize state for storing all products from API
  const [products, setProducts] = useState([]);

  // Effect hook to fetch products when component mounts
  useEffect(() => {
    async function fetchProducts() {
      // Fetch products from API endpoint
      const response = await fetch('/api/products');
      // Convert response to JSON
      const data = await response.json();
      // Update both products and filtered products state
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products productItems={products} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;