// Filter.js
import React from 'react';

const Filter = ({ selectedCategory, setSelectedCategory, categories, capitalizeFirstLetter }) => {
    return (
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
    );
};

export default Filter;