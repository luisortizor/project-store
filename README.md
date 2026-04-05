# Mis Curiosidades y Algo Más - E-commerce

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

Plataforma web de comercio electrónico orientada a la venta de artículos de papelería, oficina, escritura y manualidades artísticas. El proyecto implementa una arquitectura Full Stack separando completamente el cliente (Frontend) del servidor (Backend API).

---

## ✨ Características Principales

* **Arquitectura SPA (Single Page Application):** Navegación fluida y rápida sin recargas de página utilizando React.
* **Sistema de Autenticación Seguro:** Registro e inicio de sesión de usuarios con contraseñas encriptadas.
* **Sesiones Persistentes:** Manejo de estado de usuario conectado mediante `LocalStorage`.
* **Interfaz de Usuario (UX/UI):** Diseño moderno, 100% responsivo, implementando un sistema de "Mega Menú" para la categorización de productos.
* **API RESTful:** Servicios web desarrollados en PHP puro que responden en formato JSON.

---

## 🛠️ Tecnologías y Herramientas

### Frontend (Cliente)
* **Librería Core:** React 18
* **Entorno de Construcción:** Vite
* **Estilos:** CSS3 Modular (Flexbox, CSS Grid)
* **Iconografía:** `react-icons`
* **Peticiones HTTP:** Fetch API nativa

### Backend (Servidor)
* **Lenguaje:** PHP 8+
* **Gestión de Base de Datos:** PDO (PHP Data Objects)
* **Base de Datos:** MySQL
* **Seguridad:** BCRYPT (Hashing de contraseñas), Prevención de Inyección SQL y CORS.

---

# Guía de Instalación y Despliegue Local

## Requisitos Previos
* XAMPP o WAMP (Para ejecutar Apache y MySQL).
* Node.js (Versión 16+ recomendada).
* Git instalado en tu equipo.

## Paso 1: Clonar el Repositorio
```
git clone [https://github.com/tu-usuario/project-store.git](https://github.com/tu-usuario/project-store.git)
```

## Paso 2: Configurar el Servidor y Base de Datos (Backend)
1. Inicia Apache y MySQL desde el panel de XAMPP.
2. Mueve la carpeta `servidor` dentro del directorio público de tu servidor web (en XAMPP la ruta suele ser `C:/xampp/htdocs/project-store/servidor`).
3. Abre phpMyAdmin (`http://localhost/phpmyadmin/`).
4. Crea una base de datos llamada `mybd_store`.
5. Importa el archivo `database.sql` (ubicado en la carpeta `servidor`) para crear las tablas necesarias.

```
CREATE DATABASE mybd_store;

USE mybd_store;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    celular VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'admin') DEFAULT 'cliente' NOT NULL,
    terminos_aceptados TINYINT(1) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

6. Verifica que las credenciales en `servidor/api/conexion.php` coincidan con las de tu entorno local (por defecto usuario root sin contraseña).

## Configurar y Ejecutar el Cliente (Frontend)
Abre una terminal, navega a la carpeta cliente e instala las dependencias:
```
cd project-store/cliente
npm install
```
Inicia el servidor de desarrollo de Vite:
```
npm run dev
```
La aplicación estará disponible típicamente en `http://localhost:5173`.
