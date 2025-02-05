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

    const assignCategories = (products) => {
        return products.map(product => {
            let category = 'accessories'; // default category
            const name = product.name.toLowerCase();

            if (name.includes('playstation') || name.includes('xbox') || name.includes('nintendo')) {
                category = 'consoles';
            } else if (name.includes('controller')) {
                category = 'controllers';
            } else if (name.includes('headset') || name.includes('headphone')) {
                category = 'headsets';
            } else if (name.includes('keyboard')) {
                category = 'keyboards';
            }

            return { ...product, category };
        });
    };

    useEffect(() => {
        // First assign categories
        const productsWithCategories = assignCategories(productItems);
        let result = [...productsWithCategories];

        // Then filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(item => item.category === selectedCategory);
        }

        // Then sort
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