<?php
// 1. Configuración estricta de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Preflight OPTIONS para React
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Incluir archivos necesarios
include_once dirname(__FILE__) . '/../config/database.php'; 
include_once dirname(__FILE__) . '/../models/ProductoModel.php';
include_once dirname(__FILE__) . '/../controllers/ProductoController.php';

// 3. Conexión a la BD
$database = new Database();
$db = $database->getConnection();

if (!$db) {
    echo json_encode(["status" => 500, "message" => "Error interno: No se pudo conectar a la base de datos."]);
    exit;
}

// 4. Capturar método y datos
$metodo = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? $_GET['id'] : null;
$datos = json_decode(file_get_contents("php://input"));

// 5. Enviar al Controlador de Productos
$controlador = new ProductoController($db);
$controlador->procesarSolicitud($metodo, $id, $datos);
?>