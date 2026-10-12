# 🍳 Gestor de Recetas

## 1. Descripción del proyecto

El Gestor de Recetas es una aplicación web desarrollada con TypeScript, HTML y CSS que permite registrar y organizar recetas de cocina.

El proyecto utiliza la arquitectura MVC (Modelo-Vista-Controlador) para separar los datos, la interfaz y la lógica de la aplicación.

## 2. Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- JavaScript
- localStorage
- Node.js y npm
- TypeScript Compiler (`tsc`)
- Visual Studio Code
- Live Server

## 3. Requisitos previos

Antes de ejecutar el proyecto, se necesita:

- Tener instalado [Node.js](https://nodejs.org/).
- Tener instalado [Visual Studio Code](https://code.visualstudio.com/).
- Tener un navegador web actualizado.
- Tener conexión a Internet para instalar las dependencias.

## 4. Instalación del proyecto

### Paso 1. Descargar el repositorio

Clonar el repositorio desde una terminal:

```bash
git clone https://github.com/LinaFlores17/Gestor-de-Recetas
```


Entrar en la carpeta del proyecto:

```bash
cd gestor-recetas
```

También se puede descargar el proyecto desde GitHub mediante **Code → Download ZIP** y extraerlo en una carpeta.

### Paso 2. Abrir el proyecto

Abrir Visual Studio Code y seleccionar:

**Archivo → Abrir carpeta**

Elegir la carpeta `gestor-recetas`.

### Paso 3. Instalar las dependencias

Abrir la terminal de Visual Studio Code desde **Terminal → Nueva terminal** y ejecutar:

```bash
npm install
```

Este comando instala las dependencias necesarias para compilar el proyecto.

### Paso 4. Compilar TypeScript

Ejecutar el siguiente comando:

```bash
npm run build
```

Este comando convierte los archivos TypeScript de la carpeta `src` en archivos JavaScript dentro de la carpeta `dist`.

Si la compilación termina correctamente, se puede continuar.

## 5. Ejecutar la aplicación

1. Abrir Visual Studio Code.
2. Instalar la extensión **Live Server** desde el apartado Extensiones.
3. Ejecutar `npm run build` para generar los archivos JavaScript.
4. Hacer clic derecho sobre `index.html`.
5. Seleccionar **Open with Live Server**.

La aplicación se abrirá en el navegador.

**Importante:** cada vez que se modifique un archivo `.ts`, se debe ejecutar nuevamente `npm run build` para actualizar los archivos JavaScript.

## 6. Funcionalidades

- Registrar recetas con nombre, ingredientes y tiempo de preparación.
- Mostrar las recetas registradas.
- Buscar recetas por nombre o ingrediente.
- Marcar y desmarcar recetas como favoritas.
- Editar recetas existentes.
- Eliminar recetas con confirmación.
- Filtrar recetas por tiempo de preparación.
- Validar los datos del formulario.
- Guardar y recuperar recetas mediante `localStorage`.

## 7. Arquitectura MVC

- **Modelo:** `src/models/Receta.ts`. Define los datos y las validaciones.
- **Vista:** `src/views/RecetaView.ts`. Muestra el formulario, las tarjetas y los mensajes.
- **Controlador:** `src/controllers/RecetaController.ts`. Gestiona los eventos y las operaciones de la aplicación.
- **Almacenamiento:** `src/services/StorageService.ts`. Guarda y recupera las recetas.
- **Archivo principal:** `src/main.ts`. Inicializa los componentes.
- **Estilos:** `src/styles/styles.css`. Define el diseño visual.

## 8. Almacenamiento de datos

La aplicación utiliza `localStorage` para conservar las recetas en el navegador.

Los datos permanecen guardados después de actualizar o cerrar la página, siempre que no se borren los datos del navegador.

Las recetas no se comparten automáticamente entre diferentes navegadores o dispositivos.

## 9. Consideraciones

- Ejecutar `npm run build` después de modificar archivos TypeScript.
- No eliminar la carpeta `dist` sin volver a compilar.
- Abrir la aplicación mediante Live Server.
- No se necesita una base de datos externa.
