# 🛒 Tienda de Tecnología - Trabajo 2º Evaluación

Este proyecto es una aplicación web **SPA (Single Page Application)** desarrollada con **Vue 3**, **Vite** y **Vuetify**. Está enfocada en la gestión de inventario y categorías para una tienda de informática.

## 🚀 Resumen del Proyecto
La aplicación permite la visualización de un catálogo de productos y ofrece una gestión completa (**CRUD**) de artículos y categorías, con un sistema de permisos basado en roles de usuario.

### 🛠️ Tecnologías Utilizadas
* **Framework:** Vue.js 3 (Composition API).
* **Librería UI:** Vuetify 3.
* **Gestión de Estado:** Pinia (3 stores independientes).
* **Enrutado:** Vue Router.
* **Validación:** VeeValidate + Yup.
* **Backend:** JSON Server (Mock API) con Axios.
* **Contenedores:** Docker y Docker Compose.

---

## 🔐 Credenciales de Acceso
El sistema determina el rol del usuario según el correo electrónico introducido. La contraseña es universal para facilitar la corrección.

| Rol | Correo de ejemplo | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@gmail.com` | **1234** | CRUD completo (Crear y Borrar) |
| **Usuario Normal** | `alejandro@gmail.com` | **1234** | Solo lectura |

> **Nota:** Cualquier correo que contenga la palabra "admin" entrará con permisos de administrador.


---

## 🐳 Instrucciones de Ejecución (Docker)

Para levantar el proyecto, abre una terminal en la carpeta raíz y ejecuta:

```bash
docker compose up --build

La aplicación estará disponible en: http://localhost:8080