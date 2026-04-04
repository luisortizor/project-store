import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';       // <-- Importamos el Home
import Registro from './Registro';
import Login from './Login';
import Tienda from './Tienda';

function App() {
  // AHORA LA VISTA POR DEFECTO ES 'home'
  const [vistaActual, setVistaActual] = useState('home');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    setVistaActual('home'); // Al salir, te devuelve al inicio
  };

  const renderizarVista = () => {
    // Si la vista es Home, mostramos Home
    if (vistaActual === 'home') {
      return <Home cambiarVista={setVistaActual} />;
    }

    // CORRECCIÓN AQUÍ: Agregamos cerrarSesion y cambiarVista
    if (vistaActual === 'tienda' || (usuario && vistaActual === 'login')) {
      return (
        <Tienda
          usuario={usuario}
          cerrarSesion={cerrarSesion}
          cambiarVista={setVistaActual}
        />
      );
    }

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