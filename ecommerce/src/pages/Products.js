import React, { useEffect, useState } from 'react';
import '../styling/Products.css';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Products = () => {
    // Initialize state for storing all products from API
    const [products, setProducts] = useState([]);
    // Initialize state for storing filtered/sorted products to display
    const [filteredProducts, setFilteredProducts] = useState([]);
    // Initialize state for current category filter selection
    const [selectedCategory, setSelectedCategory] = useState('all');
    // Initialize state for current sort method
    const [sortBy, setSortBy] = useState('default');

    // Effect hook to fetch products when component mounts
    useEffect(() => {
        async function fetchProducts() {
            // Fetch products from API endpoint
            const response = await fetch('/api/products');
            // Convert response to JSON
            const data = await response.json();
            // Update both products and filtered products state
            setProducts(data);
            setFilteredProducts(data);
        }

        fetchProducts();
    }, []); // Empty dependency array means this runs once on mount

    // Effect hook to handle filtering and sorting when dependencies change
    useEffect(() => {
        // Create copy of products array to avoid mutating original
        let result = [...products];

        // Filter products by selected category if not 'all'
        if (selectedCategory !== 'all') {
            result = result.filter(item => item.category === selectedCategory);
        }

        // Apply different sorting methods based on sortBy value
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price); // Sort by price ascending
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price); // Sort by price descending
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name A-Z
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name)); // Sort by name Z-A
                break;
            default:
                break; // No sorting for default case
        }

        // Update filtered products with new sorted/filtered array
        setFilteredProducts(result);
    }, [products, selectedCategory, sortBy]); // Re-run when these dependencies change

    // Create array of unique categories from products
    const categories = ['all'];
    products.forEach(product => {
        // Add category to array if it exists and isn't already included
        if (product.category && !categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    // Utility function to capitalize first letter of string
    const capitalizeFirstLetter = (string) => {
        if (!string) return ''; // Return empty string if input is null/undefined
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    return (
        <>
            <Header />
            <NavBar />
            <section className="main-container">
                <div className="filters-container">
                    <div className="filter-group">
                        <label htmlFor="category-filter">Filter by Category:</label>
                        <select
                            id="category-filter"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="filter-select"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {capitalizeFirstLetter(category)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="sort-by">Sort by:</label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="filter-select"
                        >
                            <option value="default">Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                        </select>
                    </div>
                </div>

                <div id="products">
                    {filteredProducts.map((item, index) => (
                        <div key={index} className="item-container">
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Products;