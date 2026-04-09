<?php
class Usuario {
    private $conn;
    private $table_name = "usuarios";

    public $id;
    public $nombres;
    public $apellidos;
    public $correo;
    public $celular;
    public $fecha_nacimiento;
    public $password;
    public $rol; // Propiedad presente
    public $terminos_aceptados;

    public function __construct($db) {
        $this->conn = $db;
    }

    // ----------------------------------------------------
    // MÉTODO 1: Verificar si el correo ya existe (¡Fundamental para el Login!)
    // ----------------------------------------------------
    public function emailExiste() {
        $query = "SELECT id, nombres, apellidos, password, rol 
                  FROM " . $this->table_name . " 
                  WHERE correo = ? LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $this->correo = htmlspecialchars(strip_tags($this->correo));
        $stmt->bindParam(1, $this->correo);
        $stmt->execute();
        $num = $stmt->rowCount();

        if($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->nombres = $row['nombres'];
            $this->apellidos = $row['apellidos'];
            $this->password = $row['password']; 
            $this->rol = $row['rol']; // Aquí cargamos el rol de la DB al objeto
            return true;
        }
        return false;
    }

    // ----------------------------------------------------
    // MÉTODO 2: Registrar un nuevo usuario (CORREGIDO)
    // ----------------------------------------------------
    public function registrar() {
        // Agregamos rol=:rol a la consulta SQL
        $query = "INSERT INTO " . $this->table_name . " 
                  SET nombres=:nombres, apellidos=:apellidos, correo=:correo, 
                      celular=:celular, fecha_nacimiento=:fecha_nacimiento, 
                      password=:password, rol=:rol, terminos_aceptados=:terminos_aceptados";

        $stmt = $this->conn->prepare($query);

        // Limpieza de datos
        $this->nombres = htmlspecialchars(strip_tags($this->nombres));
        $this->apellidos = htmlspecialchars(strip_tags($this->apellidos));
        $this->correo = htmlspecialchars(strip_tags($this->correo));
        $this->celular = htmlspecialchars(strip_tags($this->celular));
        $this->fecha_nacimiento = htmlspecialchars(strip_tags($this->fecha_nacimiento));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->rol = htmlspecialchars(strip_tags($this->rol)); // Limpiamos el rol
        $this->terminos_aceptados = htmlspecialchars(strip_tags($this->terminos_aceptados));

        // Vinculación (Agregamos el bindParam del rol)
        $stmt->bindParam(":nombres", $this->nombres);
        $stmt->bindParam(":apellidos", $this->apellidos);
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":celular", $this->celular);
        $stmt->bindParam(":fecha_nacimiento", $this->fecha_nacimiento);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":rol", $this->rol); // <-- VÍNCULO VITAL
        $stmt->bindParam(":terminos_aceptados", $this->terminos_aceptados);

        if($stmt->execute()) return true;
        return false; 
    }

    // ----------------------------------------------------
    // MÉTODO 3: Consultar TODOS los usuarios
    // ----------------------------------------------------
    public function consultarTodos() {
        $query = "SELECT id, nombres, apellidos, correo, celular, fecha_nacimiento, rol, fecha_registro FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // ----------------------------------------------------
    // MÉTODO 4: Consultar UN SOLO usuario por su ID
    // ----------------------------------------------------
    public function consultarUno() {
        $query = "SELECT id, nombres, apellidos, correo, celular, fecha_nacimiento, rol FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row) {
            $this->nombres = $row['nombres'];
            $this->apellidos = $row['apellidos'];
            $this->correo = $row['correo'];
            $this->celular = $row['celular'];
            $this->fecha_nacimiento = $row['fecha_nacimiento'];
            $this->rol = $row['rol'];
            return true;
        }
        return false;
    }

    // ----------------------------------------------------
    // MÉTODO 5: Actualizar datos básicos
    // ----------------------------------------------------
    public function actualizar() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombres=:nombres, apellidos=:apellidos, celular=:celular, fecha_nacimiento=:fecha_nacimiento 
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);

        $this->nombres = htmlspecialchars(strip_tags($this->nombres));
        $this->apellidos = htmlspecialchars(strip_tags($this->apellidos));
        $this->celular = htmlspecialchars(strip_tags($this->celular));
        $this->fecha_nacimiento = htmlspecialchars(strip_tags($this->fecha_nacimiento));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":nombres", $this->nombres);
        $stmt->bindParam(":apellidos", $this->apellidos);
        $stmt->bindParam(":celular", $this->celular);
        $stmt->bindParam(":fecha_nacimiento", $this->fecha_nacimiento);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) return true;
        return false;
    }

    // ----------------------------------------------------
    // MÉTODO 6: Eliminar un usuario
    // ----------------------------------------------------
    public function eliminar() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) return true;
        return false;
    }
} // <-- ¡Esta es la llave mágica que debe envolver todo!
?>