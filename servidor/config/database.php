<?php
class Database {
    // Credenciales por defecto de XAMPP
    private $host = "localhost";
    private $db_name = "mybd_store"; // <-- Aquí va el nombre exacto de tu BD
    private $username = "root";      // <-- Usuario por defecto de XAMPP
    private $password = "";          // <-- En XAMPP la contraseña suele estar vacía
    public $conn;

    // Método para obtener la conexión
    public function getConnection() {
        $this->conn = null;

        try {
            // Creamos la conexión usando PDO para mayor seguridad
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            
            // Configuramos el set de caracteres a UTF-8 (para aceptar tildes y ñ)
            $this->conn->exec("set names utf8mb4");
            
            // Le decimos a PDO que nos lance excepciones si hay errores
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
        } catch(PDOException $exception) {
            // Si algo falla, este mensaje nos dirá exactamente qué pasó
            echo json_encode(["status" => 500, "message" => "Error de conexión a la Base de Datos: " . $exception->getMessage()]);
            exit; // Detenemos la ejecución si no hay BD
        }

        return $this->conn;
    }
}
?>