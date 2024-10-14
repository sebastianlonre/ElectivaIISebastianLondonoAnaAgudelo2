 **Nombre de la Materia:** Electiva 2 

 **Nombre del Proyecto:** Clone de X

 **Equipo:** ByteSquad

 **Integrantes:**
 * Sebastian Londoño 
 * Ana Isabel Agudelo

**Descripción:**  
Este proyecto consiste en desarrollar un clon de la red social X (anteriormente conocida como Twitter), para que esto sea posible en la entrega de:  ***Milestone 2: Desarrollo Completo de la API***, se realiza el desarrollo completo de una API utilizando Node.js y Mongoose, implementando una arquitectura hexagonal y documentando la API con Swagger.

**Instrucciones de compilación y ejecución:**
1. Clonar el repositorio:
    - git clone https://github.com/sebastianlonre/ElectivaIISebastianLondonoAnaAgudelo2
    -  Puede utilizar el editor de código de su preferencia.
2. Instalar las dependencias(en caso de que el proyecto no las tenga):
    - npm install
3. Iniciar el servidor:
    - node index.js

**Requerimientos del proyecto:**

***Lenguajes:*** 
- JavaScript (Node.js)

***Frameworks:*** 
- Express.js

***Librerías:*** 
- jsonwebtoken: Para la creación y verificación de JWT.
- dotenv: Para la gestión de variables de entorno.
- mongoose: Para la conexión y modelado de datos con MongoDB.

***Base de datos:***
- MongoDB

**Licencia:**
-  MIT

**Rutas API:**
Estas son las consultas HTTP (Pueden ser realizadas en Postman)

***El servidor estará corriendo en http://localhost:4000.***

***Registro de Usuario***

- POST /api/register: Crea un nuevo usuario.

    Request Body:
    {
    "userName": "string",
    "userLastName": "string",
    "userTag": "string",
    "email": "string",
    "password": "string"
    } 

    Responses:
    - 200: { "message": "[INFO] User registered successfully", "token": "..." }
    - 400: { "message_error": "..." }

***Inicio de Sesión***

- POST /api/login: Inicia sesión con un usuario existente.

    Request Body:
    {
    "userTag": "string",
    "password": "string"
    } 

    Responses:
    - 200: { "message": "[INFO] Login successful", "token": "..." }
    - 400: { "message_error": "..." }

***Verificación de Sesión***

- GET /api/protected-route: Requiere autenticación para acceder.

    Responses:
    - 200: { "message": "You are authenticated", "user": { "userTag": "..." } }
    - 401: { "message_error": "[ERROR] Not authenticated Users currently" }

***Cierre de Sesión***

- POST /api/logout: Cierra la sesión del usuario.

    Responses:
    - 200: { "message": "[INFO] Logout successful" }