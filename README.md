- ¿Qué generó el comando nest new?
Creo toda la estructura base del proyecto, incluyendo todas las carpetas necesarias y los archivos principales de src
- ¿Qué hace el AppService que ya viene generado?
Se encarga de manejar la logica base
- ¿Por qué la ruta funciona sin declarar nada en app.module.ts?
Porque al inicializar el proyecto con el CLI, el archivo app.module.ts ya incluye automáticamente la importación de AppController
- ¿Qué pasaría si el cuerpo de la petición viniera vacío?
El servidor crearía un registro incompleto
- ¿En qué archivo vive hoy toda la lógica de la práctica?
Todo esta en app.controller.ts