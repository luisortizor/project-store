<?php
// 1. Configurar Cabeceras (CORS y formato JSON)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Si es una petición OPTIONS (Pre-flight de React), respondemos 200 OK y terminamos.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Incluir los archivos necesarios
include_once '../config/database.php';
include_once '../models/Usuario.php';
include_once '../controllers/UsuarioController.php';

// 3. Inicializar Conexión y Objetos
$database = new Database();
$db = $database->getConnection();

$usuario = new Usuario($db);
$usuarioController = new UsuarioController($db, $usuario);

// 4. Obtener los datos enviados en la petición (Formato JSON)
$data = json_decode(file_get_contents("php://input"));

// 5. Enrutador RESTful basado en el Método HTTP (GET, POST, PUT, DELETE)
$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {
    case 'POST':
        // Puede ser Registro o Login dependiendo de 'accion'
        $accion = isset($_GET['accion']) ? $_GET['accion'] : 'registro';
        if ($accion === 'login') {
            $respuesta = $usuarioController->login($data);
        } else {
            $respuesta = $usuarioController->registrar($data);
        }
        http_response_code($respuesta['status']);
        echo json_encode($respuesta);
        break;

    case 'GET':
        // Si mandan un ID en la URL (?id=1), buscamos uno. Si no, buscamos todos.
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        $respuesta = $usuarioController->consultar($id);
        http_response_code($respuesta['status']);
        echo json_encode($respuesta);
        break;

    case 'PUT':
        // Actualizar usuario
        $respuesta = $usuarioController->actualizar($data);
        http_response_code($respuesta['status']);
        echo json_encode($respuesta);
        break;

    case 'DELETE':
        // Eliminar usuario
        $respuesta = $usuarioController->eliminar($data);
        http_response_code($respuesta['status']);
        echo json_encode($respuesta);
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método HTTP no permitido."]);
        break;
}
?>