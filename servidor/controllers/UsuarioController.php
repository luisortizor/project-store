<?php
class UsuarioController {
    private $db;
    private $usuario;

    public function __construct($db, $usuario) {
        $this->db = $db;
        $this->usuario = $usuario;
    }

// ----------------------------------------------------
    // LÓGICA PARA REGISTRAR (CORREGIDA)
    // ----------------------------------------------------
    public function registrar($data) {
        // Validamos que existan todos los campos, incluyendo confirmar_password
        if (
            empty($data->nombres) || empty($data->apellidos) || 
            empty($data->correo) || empty($data->celular) || 
            empty($data->fecha_nacimiento) || empty($data->password) ||
            empty($data->confirmar_password) || !isset($data->terminos_aceptados)
        ) {
            return ["status" => 400, "message" => "Todos los campos son obligatorios."];
        }

        if ($data->password !== $data->confirmar_password) {
            return ["status" => 400, "message" => "Las contraseñas no coinciden."];
        }

        if ($data->terminos_aceptados != 1) {
            return ["status" => 400, "message" => "Debes aceptar los términos y condiciones."];
        }

        $this->usuario->correo = $data->correo;
        if ($this->usuario->emailExiste()) {
            return ["status" => 400, "message" => "El correo electrónico ya está registrado."];
        }

        $this->usuario->nombres = $data->nombres;
        $this->usuario->apellidos = $data->apellidos;
        $this->usuario->celular = $data->celular;
        $this->usuario->fecha_nacimiento = $data->fecha_nacimiento;
        $this->usuario->terminos_aceptados = $data->terminos_aceptados;
        
        // --- AQUÍ CAPTURAMOS EL ROL PARA POSTMAN ---
        // Si en el JSON viene 'admin', lo asignamos. Si no, será 'cliente'.
        $this->usuario->rol = !empty($data->rol) ? $data->rol : 'cliente';
        
        // ENCRIPTAR CONTRASEÑA
        $this->usuario->password = password_hash($data->password, PASSWORD_BCRYPT);

        if ($this->usuario->registrar()) {
            return ["status" => 201, "message" => "Usuario registrado exitosamente."];
        } else {
            return ["status" => 503, "message" => "Error al registrar el usuario."];
        }
    }

    // ----------------------------------------------------
    // LÓGICA PARA LOGIN
    // ----------------------------------------------------
    public function login($data) {
        if (empty($data->correo) || empty($data->password)) {
            return ["status" => 400, "message" => "Correo y contraseña son requeridos."];
        }

        $this->usuario->correo = $data->correo;

        if ($this->usuario->emailExiste() && password_verify($data->password, $this->usuario->password)) {
            return [
                "status" => 200, 
                "message" => "Autenticación satisfactoria",
                "user" => [
                    "id" => $this->usuario->id,
                    "nombres" => $this->usuario->nombres,
                    "rol" => $this->usuario->rol
                ]
            ];
        } else {
            return ["status" => 401, "message" => "Error en la autenticación"];
        }
    }

    // ----------------------------------------------------
    // LÓGICA PARA CONSULTAR (GET)
    // ----------------------------------------------------
    public function consultar($id = null) {
        if ($id) {
            $this->usuario->id = $id;
            if ($this->usuario->consultarUno()) {
                $datos = [
                    "id" => $this->usuario->id,
                    "nombres" => $this->usuario->nombres,
                    "apellidos" => $this->usuario->apellidos,
                    "correo" => $this->usuario->correo,
                    "celular" => $this->usuario->celular,
                    "fecha_nacimiento" => $this->usuario->fecha_nacimiento,
                    "rol" => $this->usuario->rol
                ];
                return ["status" => 200, "data" => $datos];
            } else {
                return ["status" => 404, "message" => "Usuario no encontrado."];
            }
        } else {
            $stmt = $this->usuario->consultarTodos();
            $usuarios_arr = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($usuarios_arr, $row);
            }
            return ["status" => 200, "data" => $usuarios_arr];
        }
    }

    // ----------------------------------------------------
    // LÓGICA PARA ACTUALIZAR (PUT)
    // ----------------------------------------------------
    public function actualizar($data) {
        if (empty($data->id) || empty($data->nombres) || empty($data->apellidos) || empty($data->celular) || empty($data->fecha_nacimiento)) {
            return ["status" => 400, "message" => "Faltan datos obligatorios para actualizar."];
        }

        $this->usuario->id = $data->id;
        $this->usuario->nombres = $data->nombres;
        $this->usuario->apellidos = $data->apellidos;
        $this->usuario->celular = $data->celular;
        $this->usuario->fecha_nacimiento = $data->fecha_nacimiento;

        if ($this->usuario->actualizar()) {
            return ["status" => 200, "message" => "Usuario actualizado correctamente."];
        } else {
            return ["status" => 503, "message" => "No se pudo actualizar el usuario."];
        }
    }

    // ----------------------------------------------------
    // LÓGICA PARA ELIMINAR (DELETE)
    // ----------------------------------------------------
    public function eliminar($data) {
        if (empty($data->id)) {
            return ["status" => 400, "message" => "El ID del usuario es obligatorio."];
        }

        $this->usuario->id = $data->id;

        if ($this->usuario->eliminar()) {
            return ["status" => 200, "message" => "Usuario eliminado correctamente."];
        } else {
            return ["status" => 503, "message" => "No se pudo eliminar el usuario."];
        }
    }
} // <-- Esta es la llave que faltaba para cerrar todo correctamente
?>