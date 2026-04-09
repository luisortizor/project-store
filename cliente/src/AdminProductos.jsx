import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaBoxOpen, FaChartLine, FaExclamationTriangle, FaSearch, FaTimes } from 'react-icons/fa';
import './AdminProductos.css';

const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    // Estado del Formulario y Modal
    const [modal, setModal] = useState({ visible: false, editando: false });
    const [form, setForm] = useState({ id: '', nombre: '', descripcion: '', precio: '', stock: '', categoria: '', imagen_url: '' });

    // Estado para Notificaciones (Toast)
    const [alerta, setAlerta] = useState({ visible: false, mensaje: '', tipo: '' });

    const URL_API = "http://localhost/project-store/servidor/api/productos.php";

    const categoriasDisponibles = ['Papelería', 'Oficina', 'Escritura', 'Artístico', 'Tecnología'];

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const res = await fetch(URL_API);
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            mostrarAlerta("Error al conectar con la base de datos", "error");
        }
    };

    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ visible: true, mensaje, tipo });
        setTimeout(() => setAlerta({ visible: false, mensaje: '', tipo: '' }), 3000);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const metodo = modal.editando ? 'PUT' : 'POST';

        try {
            const res = await fetch(URL_API, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                mostrarAlerta(modal.editando ? "Producto actualizado correctamente" : "Producto añadido con éxito", "exito");
                cerrarModal();
                cargarProductos();
            } else {
                mostrarAlerta("Ocurrió un error en el servidor", "error");
            }
        } catch (error) {
            mostrarAlerta("Error de conexión", "error");
        }
    };

    const eliminar = async (id) => {
        if (window.confirm("¿Estás completamente seguro de eliminar este producto? Esta acción no se puede deshacer.")) {
            try {
                const res = await fetch(`${URL_API}?id=${id}`, { method: 'DELETE' });
                if (res.ok) {
                    mostrarAlerta("Producto eliminado", "exito");
                    cargarProductos();
                }
            } catch (error) {
                mostrarAlerta("Error al eliminar", "error");
            }
        }
    };

    const abrirModal = (prod = null) => {
        if (prod) {
            setForm(prod);
            setModal({ visible: true, editando: true });
        } else {
            // AQUÍ EL CAMBIO: categoria empieza con 'Papelería'
            setForm({ id: '', nombre: '', descripcion: '', precio: '', stock: '', categoria: 'Papelería', imagen_url: '' });
            setModal({ visible: true, editando: false });
        }
    };

    const cerrarModal = () => setModal({ visible: false, editando: false });

    // Cálculos para las métricas
    const productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    const valorTotal = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
    const stockBajo = productos.filter(p => p.stock < 5).length;

    return (
        <div className="admin-dashboard">
            {/* Notificación Flotante */}
            {alerta.visible && (
                <div className={`toast-alert ${alerta.tipo}`}>
                    {alerta.mensaje}
                </div>
            )}

            <div className="admin-header">
                <div>
                    <h1 className="admin-title">Inventario y Catálogo</h1>
                    <p className="admin-subtitle">Gestiona los productos de tu papelería desde aquí.</p>
                </div>
                <button className="btn-primary" onClick={() => abrirModal()}>
                    <FaPlus /> Nuevo Producto
                </button>
            </div>

            {/* Panel de Métricas */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon blue"><FaBoxOpen /></div>
                    <div className="metric-info">
                        <h3>Total Productos</h3>
                        <p>{productos.length}</p>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon green"><FaChartLine /></div>
                    <div className="metric-info">
                        <h3>Valor del Stock</h3>
                        <p>${valorTotal.toLocaleString()}</p>
                    </div>
                </div>
                <div className="metric-card">
                    <div className="metric-icon red"><FaExclamationTriangle /></div>
                    <div className="metric-info">
                        <h3>Alertas de Stock</h3>
                        <p>{stockBajo} productos críticos</p>
                    </div>
                </div>
            </div>

            {/* Barra de Herramientas */}
            <div className="admin-toolbar">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre de producto..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabla Principal */}
            <div className="table-container">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>Img</th>
                            <th>Nombre del Producto</th>
                            <th>Categoría</th>
                            <th>Precio Unit.</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.length > 0 ? (
                            productosFiltrados.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <img src={p.imagen_url || 'https://via.placeholder.com/40'} alt={p.nombre} className="product-thumb" />
                                    </td>
                                    <td className="fw-bold">{p.nombre}</td>
                                    <td><span className="badge-category">{p.categoria}</span></td>
                                    <td className="price-tag">${Number(p.precio).toLocaleString()}</td>
                                    <td>
                                        <span className={`badge-stock ${p.stock < 5 ? 'critical' : 'healthy'}`}>
                                            {p.stock} unid.
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <button className="action-btn edit" onClick={() => abrirModal(p)} title="Editar"><FaEdit /></button>
                                        <button className="action-btn delete" onClick={() => eliminar(p.id)} title="Eliminar"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="empty-state">No se encontraron productos.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de Creación/Edición */}
            {modal.visible && (
                <div className="modal-backdrop">
                    <div className="modal-content animate-slide-up">
                        <div className="modal-header">
                            <h2>{modal.editando ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
                            <button className="close-btn" onClick={cerrarModal}><FaTimes /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="modern-form">
                            <div className="form-group full-width">
                                <label>Nombre del Producto *</label>
                                <input name="nombre" value={form.nombre} onChange={handleChange} required autoFocus />
                            </div>

                            <div className="form-group full-width">
                                <label>Descripción</label>
                                <textarea name="descripcion" rows="3" value={form.descripcion} onChange={handleChange} />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Precio ($) *</label>
                                    <input name="precio" type="number" min="0" value={form.precio} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Stock Inicial *</label>
                                    <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Categoría</label>
                                    <select
                                        name="categoria"
                                        value={form.categoria}
                                        onChange={handleChange}
                                        required
                                        className="form-select" /* Opcional: para darle estilo si lo deseas */
                                    >
                                        {categoriasDisponibles.map(cat => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>URL de la Imagen</label>
                                    <input name="imagen_url" placeholder="https://..." value={form.imagen_url} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={cerrarModal}>Cancelar</button>
                                <button type="submit" className="btn-primary">
                                    {modal.editando ? 'Guardar Cambios' : 'Registrar Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductos;