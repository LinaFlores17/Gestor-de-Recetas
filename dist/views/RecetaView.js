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

            <label for="tiempo">Tiempo de preparación (minutos)</label>
            <input id="tiempo" type="number" min="1" step="1"
              placeholder="Ej. 30" required>

            <div class="botones-formulario">
              <button type="submit" id="btn-guardar">
                Guardar receta
              </button>
              <button type="button" id="btn-cancelar"
                class="secundario oculto">
                Cancelar edición
              </button>
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

          <div class="filtros">
            <input id="buscar" type="search"
              placeholder="Buscar receta o ingrediente...">

            <select id="filtro-tiempo">
              <option value="0">Todos los tiempos</option>
              <option value="15">Hasta 15 minutos</option>
              <option value="30">Hasta 30 minutos</option>
              <option value="60">Hasta 60 minutos</option>
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

      <footer>
        Gestor de Recetas · Proyecto académico con TypeScript
      </footer>
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
    mostrarRecetas(recetas, alEditar, alEliminar, alFavorita) {
        const lista = document.querySelector("#lista-recetas");
        document.querySelector("#contador").textContent =
            `${recetas.length} ${recetas.length === 1 ? "receta" : "recetas"}`;
        if (recetas.length === 0) {
            lista.innerHTML = `
        <div class="vacio">
          <span>🥣</span>
          <h3>No hay recetas para mostrar</h3>
          <p>Agrega una receta o cambia los filtros.</p>
        </div>
      `;
            return;
        }
        lista.innerHTML = recetas.map((receta) => `
      <article class="tarjeta">
        <div class="tarjeta-cabecera">
          <span class="icono-receta">🍽️</span>
          <button type="button"
            class="favorita ${receta.favorita ? "activa" : ""}"
            data-favorita="${receta.id}"
            aria-label="${receta.favorita ? "Quitar de favoritas" : "Marcar como favorita"}">
            ${receta.favorita ? "♥" : "♡"}
          </button>
        </div>

        <h3>${this.escaparHTML(receta.nombre)}</h3>

        <p class="tiempo">◷ ${receta.tiempo} minutos</p>

        <h4>Ingredientes</h4>
        <ul>
          ${receta.ingredientes.map((ingrediente) => `<li>${this.escaparHTML(ingrediente)}</li>`).join("")}
        </ul>

        <div class="acciones">
          <button type="button" class="secundario"
            data-editar="${receta.id}">Editar</button>
          <button type="button" class="eliminar"
            data-eliminar="${receta.id}">Eliminar</button>
        </div>
      </article>
    `).join("");
        lista.querySelectorAll("[data-editar]")
            .forEach((boton) => {
            boton.addEventListener("click", () => {
                alEditar(Number(boton.dataset.editar));
            });
        });
        lista.querySelectorAll("[data-eliminar]")
            .forEach((boton) => {
            boton.addEventListener("click", () => {
                alEliminar(Number(boton.dataset.eliminar));
            });
        });
        lista.querySelectorAll("[data-favorita]")
            .forEach((boton) => {
            boton.addEventListener("click", () => {
                alFavorita(Number(boton.dataset.favorita));
            });
        });
    }
    prepararEdicion(receta) {
        document.querySelector("#receta-id").value =
            String(receta.id);
        document.querySelector("#nombre").value =
            receta.nombre;
        document.querySelector("#ingredientes").value =
            receta.ingredientes.join(", ");
        document.querySelector("#tiempo").value =
            String(receta.tiempo);
        document.querySelector("#titulo-formulario").textContent =
            "Editar receta";
        document.querySelector("#btn-guardar").textContent =
            "Guardar cambios";
        document.querySelector("#btn-cancelar")
            .classList.remove("oculto");
        document.querySelector("#nombre").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
    limpiarFormulario() {
        this.obtenerFormulario().reset();
        document.querySelector("#receta-id").value = "";
        document.querySelector("#titulo-formulario").textContent =
            "Agregar receta";
        document.querySelector("#btn-guardar").textContent =
            "Guardar receta";
        document.querySelector("#btn-cancelar")
            .classList.add("oculto");
    }
    escaparHTML(texto) {
        return texto.replace(/[&<>"']/g, (caracter) => {
            const entidades = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };
            return entidades[caracter];
        });
    }
}
