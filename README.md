# API de CRUD y Login de Usuario

Se ha desarrollado una API que permite realizar operaciones CRUD (Crear, Consultar, Actualizar y Eliminar) sobre usuarios, además de implementar un sistema de autenticación (login) para validar las credenciales de acceso.
  
La API verifica que los datos ingresados sean correctos, notificando al usuario en caso de errores o inconsistencias.

## Ejecución del Proyecto

El proyecto está compuesto por:

+ Backend: Servidor
+ Frontend: Cliente 

Para ejecutar correctamente la aplicación, debes abrir dos terminales:

1. Ubicarse en la carpeta del servidor
2. Ubicarse en la carpeta del cliente
  
Ejecutar en ambos el siguiente comando:

```
npm run dev
```

También puedes ejecutar únicamente el servidor y probar los endpoints utilizando herramientas como Postman.
  
A continuación se presentan ejemplos para probar cada funcionalidad:

### Crear Usuario

+ Metodo: POST
+ URL: http://localhost/project-store/servidor/api/usuarios.php?accion=registro 
+ Pestaña Body: Selecciona raw y luego JSON
+ Ejemplo de código a pegar:

```
{
    "nombres": "Carlos Arturo",
    "apellidos": "Gomez",
    "correo": "carlos.gomez@correo.com",
    "celular": "3209876543",
    "fecha_nacimiento": "1998-10-15",
    "password": "seguridad123",
    "confirmar_password": "seguridad123",
    "terminos_aceptados": 1
}
```

### Consultar Usuarios

+ Método: GET
+ URL: http://localhost/project-store/servidor/api/usuarios.php
+ Pestaña Body: Selecciona none.
+ Resultado: Un arreglo JSON con todos los usuarios que tienes en la base de datos

### Consultar por ID

+ Método: GET
+ URL: http://localhost/project-store/servidor/api/usuarios.php?id=1 (Cambia el 1 por el ID del user)
+ Resultado Esperado: Te devolverá solo los datos de Carlos.

### Actualizar

+ Método: PUT
+ URL: http://localhost/project-store/servidor/api/usuarios.php
+ Pestaña Body: Selecciona raw y luego JSON.
+ Código a pegar: (Ojo: Pon el ID real que tenga Carlos en tu base de datos).

```
{
    "id": 1, 
    "nombres": "Carlos Arturo",
    "apellidos": "Gomez Perez",
    "celular": "3000000000",
    "fecha_nacimiento": "1998-10-15"
}
```

### Eliminar Usuario

+ Método: DELETE
+ URL: http://localhost/project-store/servidor/api/usuarios.php
+ Pestaña Body: Selecciona raw y luego JSON.
+ Código a pegar: (Usa el ID de Carlos).

```
{
    "id": 1
}
```

### Login

+ Metodo: POST
+ URL: http://localhost/project-store/servidor/api/usuarios.php?accion=login
+ Pestaña Body: Selecciona raw y luego JSON.
+ Código a pegar:

```
{
    "correo": "carlos.gomez@correo.com",
    "password": "seguridad123"
}
```

Permite validar las credenciales de un usuario registrado en el sistema.

## Notas

+ Todos los datos deben enviarse en formato JSON.
+ Las peticiones POST, PUT y DELETE requieren un body.
+ Se recomienda usar herramientas como Postman para probar los endpoints.
