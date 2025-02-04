import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faYahoo } from '@fortawesome/free-brands-svg-icons';
import '../styling/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <p> Copyright &copy 2024 Created by Anthony </p>
            <section className="footer-nav">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/contact">Contact</Link>
            </section>
            <section className="social-media-links">
                <a href="https://www.instagram.com/anth.ony__/" className="fa fa-instagram"> <FontAwesomeIcon icon={faInstagram} /> </a>
                <a href="https://www.linkedin.com/in/anthony-montesdeoca-7b4b6532b/" className="fa fa-linkedin"> <FontAwesomeIcon icon={faLinkedin} /> </a>
                <a href="mailto:anthony_chen97@yahoo.com" className="fa fa-yahoo"> <FontAwesomeIcon icon={faYahoo} /> </a>
            </section>
        </footer>
    );
};

export default Footer;