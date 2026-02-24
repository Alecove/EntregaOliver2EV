🛠️ Cómo arrancar el proyecto
Si acabas de descargar el código, sigue estos comandos en tu terminal de VS Code:

Instalar dependencias (creará la carpeta node_modules):

Bash
npm install
Lanzar el servidor de desarrollo:

Bash
npm run dev
Abrir en el navegador:
Ve a http://localhost:5173/.

🔑 Credenciales de Prueba
Para probar el sistema de Roles, utiliza estos criterios en la pantalla de Login:

TIP PARA EL PROFESOR:

Para entrar como ADMIN: Usa cualquier email que contenga la palabra admin (ej: admin@test.com). Tendrás permisos para crear y borrar.

Para entrar como EDITOR: Usa cualquier otro email (ej: user@test.com). Verás avisos de restricción de permisos y no podrás modificar datos.

📁 Tecnologías utilizadas
Framework: Vue 3 (Composition API).

Estilos: Vuetify 3.

Estado: Pinia.

Validación: VeeValidate + Yup.

API: Axios con JSONPlaceholder.

## 🐳 Despliegue con Docker
El proyecto está completamente dockerizado para facilitar su evaluación:

1. **Construir el contenedor**: `docker compose build`
2. **Arrancar la aplicación**: `docker compose up -d`
3. **Acceso**: La aplicación estará disponible en `http://localhost:8080`



Administrador admin@admin.com admin Gestión total y Estadísticas
 Usuario user@user.com  user Modo lectura (Solo vista)