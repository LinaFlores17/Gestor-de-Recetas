# 🍳 Gestor de Recetas

Aplicación web desarrollada en TypeScript para registrar, organizar y administrar recetas de cocina. Utiliza la arquitectura Modelo-Vista-Controlador (MVC), almacenamiento local y una interfaz sencilla e intuitiva.

## 📋 Descripción del proyecto

El Gestor de Recetas permite crear una colección personal de recetas, consultar sus ingredientes, clasificarlas por categoría y administrar la información desde el navegador.

Esta versión incorpora mejoras en la búsqueda, edición, filtrado, ordenamiento y validación de los datos, además de nuevas opciones para imprimir recetas y visualizar contadores por categoría.

## 🛠️ Tecnologías utilizadas

- **TypeScript:** lógica de la aplicación y definición de clases.
- **HTML5:** estructura de la interfaz.
- **CSS3:** estilos y diseño adaptable.
- **`localStorage`:** persistencia de los datos en el navegador.
- **Node.js y npm:** instalación de dependencias y ejecución de scripts.
- **TypeScript Compiler (`tsc`):** compilación de TypeScript a JavaScript.
- **Visual Studio Code:** editor de código.
- **Live Server:** servidor local para visualizar la aplicación.

## ✨ Funcionalidades

### 1. Gestión de recetas

- Registrar recetas con nombre, ingredientes, tiempo de preparación, categoría y porciones.
- Consultar las recetas registradas mediante tarjetas.
- Editar recetas existentes.
- Eliminar recetas mediante una confirmación.
- Marcar y desmarcar recetas como favoritas.

### 2. Búsqueda y filtros

- Buscar recetas por nombre.
- Buscar recetas por ingrediente.
- Filtrar por categoría: desayuno, almuerzo o cena.
- Filtrar por tiempo máximo de preparación.
- Mostrar únicamente las recetas favoritas.
- Combinar la búsqueda y los filtros para obtener resultados más específicos.

### 3. Ordenamiento

- Ordenar las recetas alfabéticamente por nombre.
- Ordenar las recetas por tiempo de preparación.

### 4. Contadores por categoría

La interfaz muestra la cantidad de recetas registradas en cada categoría:

- Desayuno.
- Almuerzo.
- Cena.

Los contadores representan la colección completa, independientemente de los filtros aplicados.

### 5. Impresión de recetas

Cada tarjeta incluye una opción para imprimir una receta individual con su nombre, categoría, tiempo de preparación, porciones e ingredientes.

### 6. Validaciones

El sistema comprueba que:

- El nombre de la receta no esté vacío.
- Se haya agregado al menos un ingrediente.
- El tiempo de preparación sea un entero mayor que cero.
- Las porciones sean un entero mayor que cero.
- La categoría corresponda a una opción válida.
- No exista otra receta con el mismo nombre.

Las validaciones ayudan a mantener la información organizada y a prevenir registros incorrectos.

### 7. Persistencia de datos

Las recetas se guardan en `localStorage`, por lo que permanecen disponibles después de recargar la página.

La aplicación también contempla valores predeterminados para recetas guardadas anteriormente que no tengan los campos de categoría y porciones.

> **Nota:** los datos se guardan en el navegador utilizado y no se sincronizan automáticamente con otros dispositivos.

## 🏗️ Arquitectura MVC

El proyecto separa sus responsabilidades en clases y archivos para facilitar el mantenimiento y la comprensión del código.

| Componente | Responsabilidad |
| --- | --- |
| `Receta.ts` | Modelo que define los atributos y validaciones de una receta. |
| `RecetaView.ts` | Presenta formularios, tarjetas, filtros, mensajes y opciones de impresión. |
| `RecetaController.ts` | Coordina eventos, operaciones CRUD, búsquedas y filtros. |
| `StorageService.ts` | Guarda y recupera datos mediante `localStorage`. |
| `main.ts` | Inicializa la aplicación. |
| `styles.css` | Define la apariencia visual de la interfaz. |

### ¿Qué significa MVC?

- **Model:** representa los datos y las reglas de validación.
- **View:** muestra la información y los controles de la interfaz.
- **Controller:** coordina las acciones del usuario y las operaciones del sistema.

Esta separación evita concentrar toda la lógica en un solo archivo y facilita futuras modificaciones.

## 📁 Estructura del proyecto

```text
Gestor-de-Recetas/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
├── src/
│   ├── main.ts
│   ├── models/
│   │   └── Receta.ts
│   ├── views/
│   │   └── RecetaView.ts
│   ├── controllers/
│   │   └── RecetaController.ts
│   ├── services/
│   │   └── StorageService.ts
│   └── styles/
│       └── styles.css
└── dist/
    ├── main.js
    ├── models/
    ├── views/
    ├── controllers/
    └── services/
```

La carpeta `dist` contiene los archivos JavaScript generados durante la compilación de TypeScript.

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto se necesita:

- Node.js y npm instalados.
- Visual Studio Code.
- Un navegador web actualizado.
- La extensión Live Server de Visual Studio Code.

### Descargas oficiales

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)

## 🚀 Instalación y ejecución

### Paso 1. Descargar el repositorio

Clonar el repositorio desde una terminal:

```bash
git clone https://github.com/LinaFlores17/Gestor-de-Recetas.git
cd Gestor-de-Recetas
```

También se puede descargar el repositorio desde GitHub utilizando **Code → Download ZIP** y extraerlo.

### Paso 2. Abrir el proyecto en VS Code

Desde la terminal, ejecutar:

```bash
cd gestor-recetas
```

También se puede descargar el proyecto desde GitHub mediante **Code → Download ZIP** y extraerlo en una carpeta.

### Paso 2. Abrir el proyecto

Abrir Visual Studio Code y seleccionar:

**Archivo → Abrir carpeta**

Elegir la carpeta `gestor-recetas`.

### Paso 3. Instalar dependencias

```bash
npm install
```

### Paso 4. Compilar TypeScript

```bash
npm run build
```

El comando compila los archivos `.ts` y genera los archivos `.js` en `dist`.

### Paso 5. Ejecutar la aplicación

1. Abrir `index.html` en Visual Studio Code.
2. Hacer clic derecho sobre el archivo.
3. Seleccionar **Open with Live Server**.
4. La aplicación se abrirá en el navegador.