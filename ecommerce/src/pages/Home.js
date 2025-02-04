import React from 'react';
import '../styling/Home.css';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';

const Home = () => {
    return (
        <>
            <Header />
            <NavBar />
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome Home Gamers
                    </h1>
                    <button type="button" className="hero-button" onClick={() => window.location.href = '/products'}>
                        SHOP HERE
                    </button>
                    <h2 className="hero-subtitle">
                        Level up your gaming experience with top-tier consoles, handhelds, and accessories--all in one place.
                    </h2>
                </div>
            </section>
            <Slider />
            <Footer />
        </>

    );
};

export default Home;