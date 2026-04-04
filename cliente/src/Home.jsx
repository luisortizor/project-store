import React from 'react';
import './Home.css'; // Opcional, si quieres separar el CSS del main

const Home = ({ cambiarVista }) => {
    return (
        <main className="home-main">
            {/* Sección Hero (Banner Principal) */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Bienvenidos a Mis Curiosidades y Algo Más</h1>
                    <p className="hero-subtitle">Tu tienda de confianza para papelería, material de oficina y manualidades</p>
                    <button className="hero-button" onClick={() => cambiarVista('tienda')}>
                        Explorar Productos
                    </button>
                </div>
            </section>

            {/* Sección de Productos Destacados */}
            <h2 className="section-title">Productos Destacados</h2>
            <div className="products">
                
                {/* Producto 1 */}
                <div className="product-card">
                    <div className="product-image-container">
                        {/* Asegúrate de tener estas imágenes en tu carpeta public/assets/... */}
                        <img src="/assets/products/artistico/acrilicos/acrilico-2.png" alt="Acrílico" className="product-img" />
                    </div>
                    <h4>Acrílico Masgio</h4>
                    <p className="product-price">$50.000</p>
                    <button className="add-to-cart-btn">
                        <i className="fa-solid fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>

                {/* Producto 2 */}
                <div className="product-card">
                    <div className="product-image-container">
                        <img src="/assets/products/artistico/lienzos/lienzo-1.webp" alt="Lienzo" className="product-img" />
                    </div>
                    <h4>Lienzo</h4>
                    <p className="product-price">$25.900</p>
                    <button className="add-to-cart-btn">
                        <i className="fa-solid fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>

                {/* Producto 3 */}
                <div className="product-card">
                    <div className="product-image-container">
                        <img src="/assets/products/escritura/colores/colores-1.jpg" alt="Colores" className="product-img" />
                    </div>
                    <h4>Colores</h4>
                    <p className="product-price">$20.000</p>
                    <button className="add-to-cart-btn">
                        <i className="fa-solid fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>

                {/* Producto 4 */}
                <div className="product-card">
                    <div className="product-image-container">
                        <img src="/assets/products/escritura/correctores/corrector-1.jpg" alt="Corrector" className="product-img" />
                    </div>
                    <h4>Corrector</h4>
                    <p className="product-price">$4.000</p>
                    <button className="add-to-cart-btn">
                        <i className="fa-solid fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>

            </div>
        </main>
    );
};

export default Home;