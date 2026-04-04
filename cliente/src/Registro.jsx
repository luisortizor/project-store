import { useState } from 'react';
import './Registro.css';

// Agregamos la prop { cambiarVista } aquí arriba
const Registro = ({ cambiarVista }) => {
    // 1. Estado para guardar los datos del formulario
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        celular: '',
        fecha_nacimiento: '',
        password: '',
        confirmar_password: '',
        terminos_aceptados: false
    });

    // Estado para mostrar mensajes de éxito o error
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

    // 2. Función para actualizar el estado cuando el usuario escribe
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // 3. Función para enviar los datos al Backend en PHP
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost/project-store/servidor/api/usuarios.php?accion=registro';
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    terminos_aceptados: formData.terminos_aceptados ? 1 : 0
                })
            });

            const data = await response.json();

            if (response.ok || data.status === 201) {
                setMensaje({ texto: '¡Registro exitoso! Ya puedes iniciar sesión.', tipo: 'success' });
                // Limpiamos el formulario después de un registro exitoso
                setFormData({
                    nombres: '', apellidos: '', correo: '', celular: '',
                    fecha_nacimiento: '', password: '', confirmar_password: '', terminos_aceptados: false
                });
            } else {
                setMensaje({ texto: data.message || 'Error al registrar', tipo: 'error' });
            }
        } catch (error) {
            setMensaje({ texto: 'Error de conexión con el servidor', tipo: 'error' });
        }
    };

    return (
        <main className="registro-main">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Registro de Usuario</h2>
                
                {/* AQUÍ ESTÁ EL CAMBIO PRINCIPAL: Cambiamos el <a> por un <button> que usa cambiarVista */}
                <p className="form__paragraph">
                    ¿Ya tienes una cuenta? {' '}
                    <button type="button" className="form__link-btn" onClick={() => cambiarVista('login')}>
                        Inicia sesión aquí
                    </button>
                </p>

                {/* Mensaje de alerta */}
                {mensaje.texto && (
                    <div className={`alerta alerta-${mensaje.tipo}`}>
                        {mensaje.texto}
                    </div>
                )}

                <div className="form__container">
                    <div className="form__group">
                        <input type="text" id="nombres" name="nombres" className="form__input" placeholder=" " required value={formData.nombres} onChange={handleChange} />
                        <label htmlFor="nombres" className="form__label">Nombres:</label>
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group">
                        <input type="text" id="apellidos" name="apellidos" className="form__input" placeholder=" " required value={formData.apellidos} onChange={handleChange} />
                        <label htmlFor="apellidos" className="form__label">Apellidos:</label>
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group">
                        <input type="tel" id="celular" name="celular" className="form__input" placeholder=" " required value={formData.celular} onChange={handleChange} />
                        <label htmlFor="celular" className="form__label">Celular:</label>
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group">
                        <input type="email" id="correo" name="correo" className="form__input" placeholder=" " required value={formData.correo} onChange={handleChange} />
                        <label htmlFor="correo" className="form__label">Correo electrónico:</label>
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group">
                        <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" className="form__input" placeholder=" " required value={formData.fecha_nacimiento} onChange={handleChange} />
                        <label htmlFor="fecha_nacimiento" className="form__label">Fecha de nacimiento:</label>
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group">
                        <input type="password" id="password" name="password" className="form__input" placeholder=" " required value={formData.password} onChange={handleChange} />
                        <label htmlFor="password" className="form__label">Contraseña:</label>
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group">
                        <input type="password" id="confirmar_password" name="confirmar_password" className="form__input" placeholder=" " required value={formData.confirmar_password} onChange={handleChange} />
                        <label htmlFor="confirmar_password" className="form__label">Confirmar contraseña:</label>
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group form__group--checkbox">
                        <input type="checkbox" id="terminos_aceptados" name="terminos_aceptados" className="form__checkbox" required checked={formData.terminos_aceptados} onChange={handleChange} />
                        <label htmlFor="terminos_aceptados" className="form__label--checkbox">
                            Acepto los <a href="#" className="form__link">términos y condiciones</a>
                        </label>
                    </div>

                    <button type="submit" className="form__submit">Registrarme</button>
                </div>
            </form>
        </main>
    );
};

export default Registro;