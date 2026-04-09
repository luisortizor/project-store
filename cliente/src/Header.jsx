import React, { useState } from 'react';
// Importamos los íconos (agregué FaTools para la gestión)
import { FaSearch, FaBars, FaSignOutAlt, FaUser, FaShoppingCart, FaTimes, FaChevronDown, FaTools } from 'react-icons/fa';
import './Header.css';

const Header = ({ usuario, cerrarSesion, cambiarVista }) => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [submenuActivo, setSubmenuActivo] = useState(null);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => {
        setMenuAbierto(false);
        setSubmenuActivo(null);
    };

    const manejarSubmenu = (e, nombreMenu) => {
        if (window.innerWidth <= 868) {
            e.preventDefault();
            setSubmenuActivo(submenuActivo === nombreMenu ? null : nombreMenu);
        } else {
            e.preventDefault();
            cambiarVista('tienda');
        }
    };

    const irATienda = (e) => {
        e.preventDefault();
        cambiarVista('tienda');
        cerrarMenu();
    };

    return (
        <>
            {menuAbierto && <div className="menu-overlay" onClick={cerrarMenu} style={{display: 'block'}}></div>}

            <header className="main-header">
                <div className="header-content">
                    <div className="logo" style={{cursor: 'pointer'}} onClick={() => cambiarVista('home')}>
                        <img src="/assets/images/logo-transparent.png" alt="Logo" className="logo-image" />
                    </div>

                    <div className="search-bar">
                        <form className="search-form" onSubmit={(e) => { e.preventDefault(); cambiarVista('tienda'); }}>
                            <input type="text" className="search-input" placeholder="Buscar productos" />
                            <button type="submit" className="search-button">
                                <FaSearch />
                            </button>
                        </form>
                    </div>

                    <button className="hamburger-btn" aria-label="Abrir menú" onClick={toggleMenu}>
                        <FaBars />
                    </button>

                    <div className="header-icons">
                        {/* --- BOTÓN DE ADMINISTRACIÓN (SOLO PARA ROL ADMIN) --- */}
                        {usuario?.rol === 'admin' && (
                            <button className="icon-btn admin-header-btn" onClick={() => cambiarVista('admin')} title="Panel de Gestión">
                                <FaTools style={{color: '#e8a0c4', fontSize: '1.2rem'}} />
                                <span className="icon-label" style={{fontWeight: 'bold', color: '#e8a0c4'}}>Gestionar</span>
                            </button>
                        )}

                        {usuario ? (
                            <button className="icon-btn" onClick={cerrarSesion}>
                                <FaSignOutAlt style={{color: '#ff4d4d', fontSize: '1.2rem'}} />
                                <span className="icon-label">Salir ({usuario.nombres})</span>
                            </button>
                        ) : (
                            <button className="icon-btn" onClick={() => cambiarVista('login')}>
                                <FaUser style={{fontSize: '1.2rem'}} />
                                <span className="icon-label">Mi Cuenta</span>
                            </button>
                        )}
                        
                        <button className="icon-btn" onClick={() => cambiarVista('tienda')}>
                            <FaShoppingCart style={{fontSize: '1.2rem'}} />
                            <span className="icon-label">Mi Carrito</span>
                        </button>
                    </div>
                </div>
            </header>

            <nav className={`menu ${menuAbierto ? 'activo' : ''}`}>
                <button className="close-menu-btn" aria-label="Cerrar menú" onClick={cerrarMenu}>
                    <FaTimes />
                </button>

                <div className="nav-content">
                    <ul className="nav-menu">
                        
                        {/* ACCESO RÁPIDO ADMIN EN MÓVIL */}
                        {usuario?.rol === 'admin' && (
                            <li className="nav-item">
                                <a href="#" className="nav-link admin-mobile-link" onClick={(e) => { e.preventDefault(); cambiarVista('admin'); cerrarMenu(); }}>
                                    <FaTools /> GESTIONAR INVENTARIO
                                </a>
                            </li>
                        )}

                        {/* 1. PAPELERÍA */}
                        <li className={`nav-item ${submenuActivo === 'papeleria' ? 'submenu-abierto' : ''}`}>
                            <a href="#" className="nav-link" onClick={(e) => manejarSubmenu(e, 'papeleria')}>
                                Papelería
                                <FaChevronDown className="flecha-movil" />
                            </a>
                            <ul className="submenu">
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Cuadernos</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Block</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Cartulinas</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Cartucheras</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Carpetas</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Libros</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Pegantes</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Tijeras</a></li>
                            </ul>
                        </li>

                        {/* 2. OFICINA */}
                        <li className={`nav-item ${submenuActivo === 'oficina' ? 'submenu-abierto' : ''}`}>
                            <a href="#" className="nav-link" onClick={(e) => manejarSubmenu(e, 'oficina')}>
                                Oficina
                                <FaChevronDown className="flecha-movil" />
                            </a>
                            <ul className="submenu">
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Acetato</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Agendas</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Cosedoras</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Perforadoras</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Resma</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Sobres</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Tableros</a></li>
                            </ul>
                        </li>

                        {/* 3. ESCRITURA */}
                        <li className={`nav-item ${submenuActivo === 'escritura' ? 'submenu-abierto' : ''}`}>
                            <a href="#" className="nav-link" onClick={(e) => manejarSubmenu(e, 'escritura')}>
                                Escritura
                                <FaChevronDown className="flecha-movil" />
                            </a>
                            <ul className="submenu">
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Bolígrafos</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Borradores</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Colores</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Correctores</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Crayones</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Lápices</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Marcadores</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Resaltadores</a></li>
                            </ul>
                        </li>

                        {/* 4. ARTÍSTICO */}
                        <li className={`nav-item ${submenuActivo === 'artistico' ? 'submenu-abierto' : ''}`}>
                            <a href="#" className="nav-link" onClick={(e) => manejarSubmenu(e, 'artistico')}>
                                Artístico
                                <FaChevronDown className="flecha-movil" />
                            </a>
                            <ul className="submenu">
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Lienzos</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Acrílicos</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Temperas</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Plastilinas</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Fiestas</a></li>
                            </ul>
                        </li>

                        {/* 5. TECNOLOGÍA */}
                        <li className={`nav-item ${submenuActivo === 'tecnologia' ? 'submenu-abierto' : ''}`}>
                            <a href="#" className="nav-link" onClick={(e) => manejarSubmenu(e, 'tecnologia')}>
                                Tecnología
                                <FaChevronDown className="flecha-movil" />
                            </a>
                            <ul className="submenu">
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Memorias USB</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Teclados</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Mouse</a></li>
                                <li><a href="#" className="submenu-link" onClick={irATienda}>Cables USB</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Header;