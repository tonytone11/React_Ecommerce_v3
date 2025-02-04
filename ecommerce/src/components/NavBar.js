import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/NavBar.css';

const NavBar = () => {
    return (
        <nav className="nav-container">
            <Link className='link-pages' to="/products">Products</Link>
            <Link className='link-pages' to="/">Home</Link>
            <Link className='link-pages' to="/contact">Contact</Link>
        </nav>
    );
};

export default NavBar;