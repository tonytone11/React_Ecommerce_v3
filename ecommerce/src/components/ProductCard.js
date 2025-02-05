import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="item-container">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductCard;