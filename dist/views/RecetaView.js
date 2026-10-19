export class RecetaView {
    constructor() {
        this.app = document.querySelector("#app");
    }
    mostrarPagina() {
        this.app.innerHTML = `
      <header class="encabezado">
        <div class="marca">🍳 Sazón en Casa</div>
        <p>Organiza tus recetas favoritas en un solo lugar.</p>
      </header>

      <main class="contenedor">
        <section class="panel">
          <h2 id="titulo-formulario">Agregar receta</h2>

          <form id="form-receta">
            <input type="hidden" id="receta-id">

            <label for="nombre">Nombre de la receta</label>
            <input id="nombre" type="text"
              placeholder="Ej. Pastel de chocolate" required>

            <label for="ingredientes">Ingredientes</label>
            <textarea id="ingredientes" rows="4"
              placeholder="Harina, huevos, azúcar..."
              required></textarea>
            <small>Separa los ingredientes con comas o saltos de línea.</small>

            <label for="categoria">Categoría</label>
            <select id="categoria" required>
              <option value="Desayuno">Desayuno</option>
              <option value="Almuerzo">Almuerzo</option>
              <option value="Cena" selected>Cena</option>
            </select>

            <label for="porciones">Porciones</label>
            <input id="porciones" type="number"
              min="1" step="1" value="1" required>

            <label for="tiempo">Tiempo de preparación (minutos)</label>
            <input id="tiempo" type="number" min="1" step="1"
              placeholder="Ej. 30" required>

            <div class="botones-formulario">
              <button type="submit" id="btn-guardar">Guardar receta</button>
              <button type="button" id="btn-cancelar"
                class="secundario oculto">Cancelar edición</button>
            </div>
          </form>
        </section>

        <section class="listado">
          <div class="titulo-listado">
            <div>
              <h2>Mis recetas</h2>
              <p>Tu colección personal de cocina.</p>
            </div>
            <span id="contador" class="contador">0 recetas</span>
          </div>

          <div class="resumen-categorias">
            <span>Desayunos: <strong id="cuenta-desayuno">0</strong></span>
            <span>Almuerzos: <strong id="cuenta-almuerzo">0</strong></span>
            <span>Cenas: <strong id="cuenta-cena">0</strong></span>
          </div>

          <div class="filtros">
            <input id="buscar" type="search"
              placeholder="Buscar receta o ingrediente...">

            <select id="filtro-categoria">
              <option value="">Todas las categorías</option>
              <option value="Desayuno">Desayuno</option>
              <option value="Almuerzo">Almuerzo</option>
              <option value="Cena">Cena</option>
            </select>

            <select id="filtro-tiempo">
              <option value="0">Todos los tiempos</option>
              <option value="15">Hasta 15 minutos</option>
              <option value="30">Hasta 30 minutos</option>
              <option value="60">Hasta 60 minutos</option>
            </select>

            <select id="ordenar">
              <option value="">Orden original</option>
              <option value="nombre">Ordenar por nombre</option>
              <option value="tiempo">Ordenar por tiempo</option>
            </select>

            <label class="favoritas-filtro">
              <input type="checkbox" id="solo-favoritas">
              Solo favoritas
            </label>
          </div>

          <p id="mensaje" role="status" aria-live="polite"></p>
          <div id="lista-recetas" class="tarjetas"></div>
        </section>
      </main>
    `;
    }
    mostrarMensaje(mensaje) {
        document.querySelector("#mensaje").textContent = mensaje;
    }
    obtenerFormulario() {
        return document.querySelector("#form-receta");
    }
    obtenerValor(id) {
        return (document.querySelector(`#${id}`)?.value ?? "");
    }
    estaMarcado(id) {
        return document.querySelector(`#${id}`).checked;
    }
    actualizarContadores(recetas) {
        document.querySelector("#cuenta-desayuno").textContent = String(recetas.filter((r) => r.categoria === "Desayuno").length);
        document.querySelector("#cuenta-almuerzo").textContent = String(recetas.filter((r) => r.categoria === "Almuerzo").length);
        document.querySelector("#cuenta-cena").textContent = String(recetas.filter((r) => r.categoria === "Cena").length);
    }
    mostrarRecetas(recetas, alEditar, alEliminar, alFavorita, alImprimir) {
        const lista = document.querySelector("#lista-recetas");
        document.querySelector("#contador").textContent =
            `${recetas.length} ${recetas.length === 1 ? "receta" : "recetas"}`;
        if (recetas.length === 0) {
            lista.innerHTML = `
        <div class="vacio">
          <span>🥣</span>
          <h3>No hay recetas para mostrar</h3>
          <p>Agrega una receta o cambia los filtros.</p>
        </div>`;
            return;
        }
        lista.innerHTML = recetas
            .map((receta) => `
      <article class="tarjeta">
        <div class="tarjeta-cabecera">
          <span class="icono-receta">🍽️</span>
          <button type="button"
            class="favorita ${receta.favorita ? "activa" : ""}"
            data-favorita="${receta.id}"
            aria-label="Cambiar estado de favorita">
            ${receta.favorita ? "♥" : "♡"}
          </button>
        </div>

        <h3>${this.escaparHTML(receta.nombre)}</h3>
        <p class="categoria">${this.escaparHTML(receta.categoria)}</p>
        <p class="tiempo">◷ ${receta.tiempo} minutos</p>
        <p>👥 Porciones: ${receta.porciones}</p>

        <h4>Ingredientes</h4>
        <ul>
          ${receta.ingredientes
            .map((ingrediente) => `<li>${this.escaparHTML(ingrediente)}</li>`)
            .join("")}
        </ul>

        <div class="acciones">
          <button type="button" class="secundario"
            data-editar="${receta.id}">Editar</button>
          <button type="button" class="eliminar"
            data-eliminar="${receta.id}">Eliminar</button>
          <button type="button" data-imprimir="${receta.id}">
            Imprimir
          </button>
        </div>
      </article>
    `)
            .join("");
        lista
            .querySelectorAll("[data-editar]")
            .forEach((boton) => boton.addEventListener("click", () => alEditar(Number(boton.dataset.editar))));
        lista
            .querySelectorAll("[data-eliminar]")
            .forEach((boton) => boton.addEventListener("click", () => alEliminar(Number(boton.dataset.eliminar))));
        lista
            .querySelectorAll("[data-favorita]")
            .forEach((boton) => boton.addEventListener("click", () => alFavorita(Number(boton.dataset.favorita))));
        lista
            .querySelectorAll("[data-imprimir]")
            .forEach((boton) => boton.addEventListener("click", () => alImprimir(Number(boton.dataset.imprimir))));
    }
    prepararEdicion(receta) {
        document.querySelector("#receta-id").value = String(receta.id);
        document.querySelector("#nombre").value =
            receta.nombre;
        document.querySelector("#ingredientes").value =
            receta.ingredientes.join(", ");
        document.querySelector("#tiempo").value = String(receta.tiempo);
        document.querySelector("#categoria").value =
            receta.categoria;
        document.querySelector("#porciones").value = String(receta.porciones);
        document.querySelector("#titulo-formulario").textContent = "Editar receta";
        document.querySelector("#btn-guardar").textContent = "Actualizar receta";
        document.querySelector("#btn-cancelar").classList.remove("oculto");
        document.querySelector("#nombre").scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }
    limpiarFormulario() {
        this.obtenerFormulario().reset();
        document.querySelector("#receta-id").value = "";
        document.querySelector("#categoria").value = "Cena";
        document.querySelector("#porciones").value = "1";
        document.querySelector("#titulo-formulario").textContent =
            "Agregar receta";
        document.querySelector("#btn-guardar").textContent = "Guardar receta";
        document.querySelector("#btn-cancelar").classList.add("oculto");
    }
    imprimirReceta(receta) {
        const ventana = window.open("", "_blank");
        if (!ventana) {
            this.mostrarMensaje("El navegador bloqueó la ventana de impresión. Permite las ventanas emergentes e inténtalo de nuevo.");
            return;
        }
        const ingredientes = receta.ingredientes
            .map((ingrediente) => `<li>${this.escaparHTML(ingrediente)}</li>`)
            .join("");
        ventana.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${this.escaparHTML(receta.nombre)}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 35px; }
          h1 { color: #087f70; }
          li { margin-bottom: 8px; }
        </style>
      </head>
      <body>
        <h1>${this.escaparHTML(receta.nombre)}</h1>
        <p><strong>Categoría:</strong> ${this.escaparHTML(receta.categoria)}</p>
        <p><strong>Tiempo:</strong> ${receta.tiempo} minutos</p>
        <p><strong>Porciones:</strong> ${receta.porciones}</p>
        <h2>Ingredientes</h2>
        <ul>${ingredientes}</ul>
      </body>
      </html>
    `);
        ventana.document.close();
        ventana.focus();
        ventana.print();
    }
    escaparHTML(texto) {
        return texto.replace(/[&<>"']/g, (caracter) => {
            const entidades = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            };
            return entidades[caracter];
        });
    }
}
