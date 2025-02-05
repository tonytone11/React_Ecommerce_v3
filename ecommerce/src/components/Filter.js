import React from 'react';

const Filter = ({ selectedCategory, setSelectedCategory, categories, capitalizeFirstLetter }) => {
    const productCategories = ['all', 'consoles', 'controllers', 'headsets', 'accessories'];

    return (
        <div className="filter-group">
            <label htmlFor="category-filter">Filter by:</label>
            <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
            >
                {productCategories.map(category => (
                    <option key={category} value={category}>
                        {capitalizeFirstLetter(category)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;