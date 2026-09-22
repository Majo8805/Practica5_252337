Preguntas Practica 5
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

Preguntas Practica 6
- ¿Qué pasaría si el módulo no quedara registrado en la raíz?
NestJS no lo cargaria al iniciar el programa
- ¿Por qué los métodos del repositorio devuelven promesas si los datos van a estar en memoria?
Para asi simular el comportamiento de una base de datos real
- ¿Qué error apareció al cambiar a la interfaz, y por qué la clase sí se había resuelto sola?
Un error que decia que NestJS no podia resolver la dependencia
- ¿Por qué el servicio necesita un token para el repositorio, pero el controlador no lo necesita para el servicio?
Por que el repositorio se inyecta usando una interfaz que necesita un token.
- ¿Cuál es la diferencia entre un 400 y un 409?
El error 400 indica que la petición del cliente está mal formada o le faltan datos obligatorios; mientras que el error 409 indica que la petición está bien, pero choca con el estado actual del sistema o las reglas de negocio
- ¿Por qué cambió el código de estado de esa última petición? (Al cancelar y volver a intentar) 
Porque al principio la petición chocaba con las reglas de negocio y devolvía un 409

Preguntas Practica 7
- ¿Por qué la interfaz MiembroRepository no menciona Express, NestJS ni memoria?
Porque la interfaz pertenece a la capa de Dominio, la cual dicta las reglas de negocio en TypeScript y debe de ser independiente de cualquier framework o base de datos
- ¿Qué palabra de la clase MiembroMemoriaRepository es la que promete cumplir la interfaz del paso anterior?
La palabra clave es implements, la cual obliga a la clase a desarrollar todos los metodos definidos en la interfaz
- ¿Por qué el archivo miembros.service.ts no sabe qué es una petición HTTP?
Porque es un componente de la capa de Aplicacion. Y su unica responsabilidad es manejar la logica de negocio y conectarse al repositorio
- ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?
Porque el Service es una clase concreta que NestJS puede instanciar directamente, mientras que el repositorio en el Controller se pide como una Interfaz.
- ¿Qué prueba, en los hechos, que agregar Miembros no rompió nada de Inscripciones?
Que al crear Miembros en su propia carpeta y modulo aislados, sin modificar el codigo interno de Inscripciones, asegura que sus funcionamientos son independientes. Si se probaran las peticiones de /inscripciones, seguirian respondiendo correctamente.

Preguntas Asignacion 1
- ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?
Porque el Service es una clase concreta que NestJS puede instanciar automaticamente. Mientras que el repositorio, como es una interfaz, necesita el token
- Si mandas un claseId que no es número, ¿qué código de estado esperarías, y por qué este Controller no lo detecta?
Se esperaria un error 400 Bad Request. Por que TypeScript solo revisa tipos al programar, no al ejecutar