<?php
class ProductoModel {
    private $conn;
    private $table_name = "productos";

    public $id;
    public $nombre;
    public $descripcion;
    public $precio;
    public $stock;
    public $categoria;
    public $imagen_url;

    public function __construct($db) {
        $this->conn = $db;
    }

    // 1. Leer todos los productos
    public function leer() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // 2. Crear un producto
    public function crear() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET nombre=:nombre, descripcion=:descripcion, precio=:precio, 
                      stock=:stock, categoria=:categoria, imagen_url=:imagen_url";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":precio", $this->precio);
        $stmt->bindParam(":stock", $this->stock);
        $stmt->bindParam(":categoria", $this->categoria);
        $stmt->bindParam(":imagen_url", $this->imagen_url);

        if($stmt->execute()) return true;
        return false;
    }

    // 3. Actualizar un producto
    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombre=:nombre, descripcion=:descripcion, precio=:precio, 
                      stock=:stock, categoria=:categoria, imagen_url=:imagen_url
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":precio", $this->precio);
        $stmt->bindParam(":stock", $this->stock);
        $stmt->bindParam(":categoria", $this->categoria);
        $stmt->bindParam(":imagen_url", $this->imagen_url);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) return true;
        return false;
    }

    // 4. Eliminar un producto
    public function eliminar() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) return true;
        return false;
    }
}
?>