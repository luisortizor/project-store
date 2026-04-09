<?php
class ProductoController {
    private $db;
    private $producto;

    public function __construct($db) {
        $this->db = $db;
        $this->producto = new ProductoModel($db);
    }

    // Este es el "director de orquesta" que decide qué hacer
    public function procesarSolicitud($metodo, $id, $datos) {
        switch ($metodo) {
            case 'GET':
                $this->obtenerProductos();
                break;
            case 'POST':
                $this->crearProducto($datos);
                break;
            case 'PUT':
                $this->actualizarProducto($datos);
                break;
            case 'DELETE':
                $this->eliminarProducto($id);
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Método no permitido"]);
                break;
        }
    }

    private function obtenerProductos() {
        $stmt = $this->producto->leer();
        $productos_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($productos_arr, $row);
        }
        http_response_code(200);
        echo json_encode($productos_arr);
    }

    private function crearProducto($datos) {
        // Validamos campos obligatorios
        if (!empty($datos->nombre) && !empty($datos->precio) && isset($datos->stock)) {
            $this->producto->nombre = $datos->nombre;
            $this->producto->descripcion = isset($datos->descripcion) ? $datos->descripcion : "";
            $this->producto->precio = $datos->precio;
            $this->producto->stock = $datos->stock;
            $this->producto->categoria = isset($datos->categoria) ? $datos->categoria : "";
            $this->producto->imagen_url = isset($datos->imagen_url) ? $datos->imagen_url : "";

            if ($this->producto->crear()) {
                http_response_code(201);
                echo json_encode(["message" => "Producto creado correctamente"]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Error al guardar el producto"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Faltan campos obligatorios"]);
        }
    }

    private function actualizarProducto($datos) {
        if (!empty($datos->id) && !empty($datos->nombre) && !empty($datos->precio)) {
            $this->producto->id = $datos->id;
            $this->producto->nombre = $datos->nombre;
            $this->producto->descripcion = isset($datos->descripcion) ? $datos->descripcion : "";
            $this->producto->precio = $datos->precio;
            $this->producto->stock = isset($datos->stock) ? $datos->stock : 0;
            $this->producto->categoria = isset($datos->categoria) ? $datos->categoria : "";
            $this->producto->imagen_url = isset($datos->imagen_url) ? $datos->imagen_url : "";

            if ($this->producto->actualizar()) {
                http_response_code(200);
                echo json_encode(["message" => "Producto actualizado"]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Error al actualizar"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Datos incompletos"]);
        }
    }

    private function eliminarProducto($id) {
        if (!empty($id)) {
            $this->producto->id = $id;
            if ($this->producto->eliminar()) {
                http_response_code(200);
                echo json_encode(["message" => "Producto eliminado"]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Error al eliminar"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "ID no proporcionado"]);
        }
    }
}
?>