import React, { useState, useEffect } from 'react';
import '../styling/Products.css';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Sort from '../components/Sort';
import Filter from '../components/Filter';

const Products = ({ productItems }) => {
    const [filteredProducts, setFilteredProducts] = useState(productItems || []);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        let result = [...productItems];

        if (selectedCategory !== 'all') {
            result = result.filter(item => item.category === selectedCategory);
        }

        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        setFilteredProducts(result);
    }, [productItems, selectedCategory, sortBy]);

    const categories = ['all'];
    productItems.forEach(product => {
        if (product.category && !categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    return (
        <>
            <Header />
            <NavBar />
            <section className="main-container">
                <div className="filters-container">
                    <Filter
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categories={categories}
                        capitalizeFirstLetter={capitalizeFirstLetter}
                    />
                    <Sort sortBy={sortBy} setSortBy={setSortBy} />
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