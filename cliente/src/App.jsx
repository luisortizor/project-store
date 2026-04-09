import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Registro from './Registro';
import Login from './Login';
import Tienda from './Tienda';
import AdminProductos from './AdminProductos'; // <-- Importamos el nuevo módulo

function App() {
  const [vistaActual, setVistaActual] = useState('home');
  const [usuario, setUsuario] = useState(null);

  // Al cargar la app, verificamos si hay una sesión activa
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    setVistaActual('home'); 
  };

  const renderizarVista = () => {
    // 1. Vista de Inicio
    if (vistaActual === 'home') {
      return <Home cambiarVista={setVistaActual} />;
    }

    // 2. Vista de Tienda (Solo si está logueado o redirección si intenta ir a login estando ya dentro)
    if (vistaActual === 'tienda' || (usuario && vistaActual === 'login')) {
      return (
        <Tienda
          usuario={usuario}
          cerrarSesion={cerrarSesion}
          cambiarVista={setVistaActual}
        />
      );
    }

    // 3. Módulo Administrativo (PROTEGIDO)
    if (vistaActual === 'admin') {
      // Si el rol es 'admin', mostramos el CRUD, de lo contrario al Home
      return usuario?.rol === 'admin' ? 
        <AdminProductos /> : 
        <Home cambiarVista={setVistaActual} />;
    }

    // 4. Login y Registro
    if (vistaActual === 'login') {
      return <Login cambiarVista={setVistaActual} setUsuario={setUsuario} />;
    }

    if (vistaActual === 'registro') {
      return <Registro cambiarVista={setVistaActual} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        usuario={usuario}
        cerrarSesion={cerrarSesion}
        cambiarVista={setVistaActual}
      />

      <div style={{ flex: 1 }}>
        {renderizarVista()}
      </div>

      <Footer />
    </div>
  )
}

export default App;