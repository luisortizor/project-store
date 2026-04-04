import React from 'react';

const Tienda = ({ usuario, cerrarSesion }) => {
    return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h1 style={{ color: '#e8a0c4' }}>Mis Curiosidades y Algo Más</h1>
            <h2>¡Hola, {usuario.nombres}! Qué bueno verte por aquí.</h2>
            <p>Has iniciado sesión exitosamente. Tu rol es: <strong>{usuario.rol}</strong></p>
            
            <div style={{ marginTop: '50px', padding: '20px', border: '2px dashed #ccc', borderRadius: '10px' }}>
                <p>🛒 <em>Aquí irán todos tus cuadernos, colores y libretas pronto...</em></p>
            </div>

            <button 
                onClick={cerrarSesion} 
                style={{ 
                    marginTop: '30px', 
                    padding: '10px 20px', 
                    backgroundColor: '#ff4d4d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Tienda;