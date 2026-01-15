# Guía de usuario — Tarea Semana 2

Propósito
--------
Aplicación educativa con una colección de vistas (Ejercicio1..Ejercicio19). Útil para revisar ejemplos de Razor Views y manejo de rutas en ASP.NET Core.

Navegación básica
-----------------
- Página principal: `/` o `/Home/Index`
- Privacy: `/Home/Privacy`
- Ejercicios: `/Home/Ejercicio1` … `/Home/Ejercicio19`

Archivos clave
-------------
- `Controllers/HomeController.cs` — define las acciones disponibles:
  - `Index`, `Privacy`, `Ejercicio1`…`Ejercicio19`, `Error`.
- `Views/Home/` — contiene las vistas `.cshtml` para cada acción.
- `Views/Shared/_Layout.cshtml` — layout común (navegación, referencias CSS/JS).
- `wwwroot/` — hojas de estilo, scripts y assets. Ej.: `wwwroot/css/pages/estiloNavBar.css`.
- `WebSystemExample.csproj` — proyect file (target `net10.0`).

Cómo usar la aplicación (casos de uso)
-------------------------------------
1. Navegar entre ejercicios:
   - Abrir el navegador y acceder a `/Home/EjercicioX`.
2. Modificar una vista:
   - Editar `Views/Home/EjercicioX.cshtml`. Guardar y recargar la página.
3. Añadir un nuevo ejercicio:
   - En `Controllers/HomeController.cs` añadir un método `public IActionResult Ejercicio20() { return View(); }`.
   - Crear `Views/Home/Ejercicio20.cshtml`.
4. Añadir CSS/JS:
   - Colocar archivos en `wwwroot/css` o `wwwroot/js` y referenciarlos en `_Layout.cshtml` o en la vista específica.

Desarrollo y depuración
-----------------------
- Ejecutar en Visual Studio 2026 con __F5__ o __Debug > Start Debugging__.
- Para ver logs de arranque, revisar la salida de la aplicación en la ventana Output.
- Si la vista devuelve error, comprobar la ruta/nombre del archivo `.cshtml` y el nombre de la acción en `HomeController`.

Despliegue
----------
- `dotnet publish -c Release -o ./publish` y desplegar la carpeta `publish` en el servidor/host deseado.

Buenas prácticas sugeridas
--------------------------
- Mantener acciones y vistas con nombres coherentes.
- Separar estilos por páginas en `wwwroot/css/pages/`.
- Añadir validaciones del lado servidor en caso de formularios.
- Incluir un `LICENSE` si el proyecto será público.

Resolución de problemas comunes
-------------------------------
- Error 404 en una vista:
  - Verificar que exista `Views/{Controller}/{Action}.cshtml`.
- Cambios no aplican tras editar:
  - Reiniciar la app (`dotnet run`) o recargar el perfil de depuración.
- Paquetes o SDK no encontrados:
  - Asegurarse de tener instalado .NET SDK 10 y ejecutar `dotnet restore`.

Resumen rápido de comandos
-------------------------
- Restaurar: `dotnet restore`
- Ejecutar: `dotnet run`
- Publicar: `dotnet publish -c Release -o ./publish`
- Depurar en VS: iniciar con __F5__

Fin
---
Abrir issues para dudas o pedir ampliación (p. ej. añadir diagramas de flujo, screenshots, o una sección de tests).
