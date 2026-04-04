import { useState } from 'react';
import './Login.css';

// 1. Agregamos setUsuario aquí en los parámetros
const Login = ({ cambiarVista, setUsuario }) => {
    const [formData, setFormData] = useState({
        correo: '',
        password: ''
    });

    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje({ texto: 'Iniciando sesión...', tipo: 'info' });

        try {
            const url = 'http://localhost/project-store/servidor/api/usuarios.php?accion=login';
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.status === 200) {
                setMensaje({ texto: `¡Bienvenido ${data.user.nombres}!`, tipo: 'success' });
                
                // Guardamos los datos del usuario en el navegador (localStorage)
                localStorage.setItem('usuario', JSON.stringify(data.user));
                
                // 2. Le avisamos a App.jsx que el usuario entró para que cambie la pantalla a la Tienda
                setUsuario(data.user);
                
            } else {
                setMensaje({ texto: data.message || 'Correo o contraseña incorrectos', tipo: 'error' });
            }
        } catch (error) {
            setMensaje({ texto: 'Error de conexión con el servidor', tipo: 'error' });
        }
    };

    return (
        <main className="login-main">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Iniciar Sesión</h2>
                <p className="form__paragraph">
                    ¿Aún no tienes cuenta? {' '}
                    {/* Este botón cambiará la vista al componente de Registro */}
                    <button type="button" className="form__link-btn" onClick={() => cambiarVista('registro')}>
                        Regístrate aquí
                    </button>
                </p>

                {mensaje.texto && (
                    <div className={`alerta alerta-${mensaje.tipo}`}>
                        {mensaje.texto}
                    </div>
                )}

                <div className="form__container">
                    <div className="form__group">
                        <input type="email" id="correo" name="correo" className="form__input" placeholder=" " required value={formData.correo} onChange={handleChange} />
                        <label htmlFor="correo" className="form__label">Correo electrónico:</label>
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group">
                        <input type="password" id="password" name="password" className="form__input" placeholder=" " required value={formData.password} onChange={handleChange} />
                        <label htmlFor="password" className="form__label">Contraseña:</label>
                        <span className="form__line"></span>
                    </div>

                    <button type="submit" className="form__submit">Entrar</button>
                </div>
            </form>
        </main>
    );
};

export default Login;