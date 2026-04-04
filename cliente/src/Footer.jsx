import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Mis Curiosidades y Algo Más</h3>
                    <p className="footer-description">Tu tienda de confianza para todo en papelería, material de oficina y manualidades.</p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><FaFacebook /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Categorías</h3>
                    <ul>
                        <li><a href="#">Papelería</a></li>
                        <li><a href="#">Oficina</a></li>
                        <li><a href="#">Escritura</a></li>
                        <li><a href="#">Artístico</a></li>
                        <li><a href="#">Tecnología</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Contacto</h3>
                    <div className="contact-info">
                        <p><FaPhone style={{color: '#F8BFD8', width: '20px'}} /> +57 300 123 4567</p>
                        <p><FaEnvelope style={{color: '#F8BFD8', width: '20px'}} /> contacto@miscuriosidades.com</p>
                        <p><FaMapMarkerAlt style={{color: '#F8BFD8', width: '20px'}} /> Calle 123 #45-67, Bogotá</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 Mis Curiosidades y Algo Más. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;