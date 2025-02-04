import React from 'react';

const Sort = ({ sortBy, setSortBy }) => {
    return (
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
    );
};

export default Sort;