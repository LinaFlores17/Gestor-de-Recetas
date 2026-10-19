import { Receta } from "../models/Receta.js";
export class RecetaController {
    constructor(view, storage) {
        this.view = view;
        this.storage = storage;
        this.recetas = this.storage.obtenerRecetas();
        this.view.mostrarPagina();
        this.registrarEventos();
        this.actualizarVista();
    }
    registrarEventos() {
        this.view.obtenerFormulario().addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.guardarReceta();
        });
        [
            "buscar",
            "filtro-categoria",
            "filtro-tiempo",
            "ordenar",
            "solo-favoritas",
        ].forEach((id) => {
            const elemento = document.querySelector(`#${id}`);
            elemento.addEventListener(id === "buscar" ? "input" : "change", () => this.actualizarVista());
        });
        document.querySelector("#btn-cancelar").addEventListener("click", () => {
            this.view.limpiarFormulario();
            this.view.mostrarMensaje("Edición cancelada.");
        });
    }
    guardarReceta() {
        const idTexto = this.view.obtenerValor("receta-id");
        const nombre = this.view.obtenerValor("nombre").trim();
        const ingredientes = this.view
            .obtenerValor("ingredientes")
            .split(/[,\n]+/)
            .map((ingrediente) => ingrediente.trim())
            .filter((ingrediente) => ingrediente !== "");
        const tiempoTexto = this.view.obtenerValor("tiempo");
        const porcionesTexto = this.view.obtenerValor("porciones");
        if (tiempoTexto.trim() === "" || porcionesTexto.trim() === "") {
            this.view.mostrarMensaje("Completa el tiempo y las porciones.");
            return;
        }
        const id = idTexto ? Number(idTexto) : Date.now();
        const categoria = this.view.obtenerValor("categoria");
        const duplicada = this.recetas.some((receta) => receta.id !== id &&
            receta.nombre.trim().toLowerCase() === nombre.toLowerCase());
        if (duplicada) {
            this.view.mostrarMensaje("Ya existe una receta con ese nombre.");
            return;
        }
        const receta = new Receta(id, nombre, ingredientes, Number(tiempoTexto), this.recetas.find((r) => r.id === id)?.favorita ?? false, categoria, Number(porcionesTexto));
        const error = receta.validar();
        if (error) {
            this.view.mostrarMensaje(error);
            return;
        }
        if (idTexto) {
            this.recetas = this.recetas.map((r) => (r.id === id ? receta : r));
            this.view.mostrarMensaje("¡Receta actualizada correctamente!");
        }
        else {
            this.recetas.push(receta);
            this.view.mostrarMensaje("¡Receta registrada correctamente!");
        }
        this.guardarDatos();
        this.view.limpiarFormulario();
        this.actualizarVista();
    }
    editarReceta(id) {
        const receta = this.recetas.find((r) => r.id === id);
        if (receta) {
            this.view.prepararEdicion(receta);
            this.view.mostrarMensaje("Modifica los datos y pulsa Actualizar receta.");
        }
    }
    eliminarReceta(id) {
        const receta = this.recetas.find((r) => r.id === id);
        if (!receta)
            return;
        if (!window.confirm(`¿Deseas eliminar la receta "${receta.nombre}"?`)) {
            return;
        }
        this.recetas = this.recetas.filter((r) => r.id !== id);
        if (this.view.obtenerValor("receta-id") === String(id)) {
            this.view.limpiarFormulario();
        }
        this.guardarDatos();
        this.actualizarVista();
        this.view.mostrarMensaje("Receta eliminada correctamente.");
    }
    cambiarFavorita(id) {
        this.recetas = this.recetas.map((r) => r.id === id
            ? new Receta(r.id, r.nombre, r.ingredientes, r.tiempo, !r.favorita, r.categoria, r.porciones)
            : r);
        this.guardarDatos();
        this.actualizarVista();
    }
    imprimirReceta(id) {
        const receta = this.recetas.find((r) => r.id === id);
        if (receta) {
            this.view.imprimirReceta(receta);
        }
    }
    actualizarVista() {
        const busqueda = this.view.obtenerValor("buscar").toLowerCase().trim();
        const categoria = this.view.obtenerValor("filtro-categoria");
        const tiempoMaximo = Number(this.view.obtenerValor("filtro-tiempo"));
        const soloFavoritas = this.view.estaMarcado("solo-favoritas");
        const orden = this.view.obtenerValor("ordenar");
        let filtradas = this.recetas.filter((receta) => {
            const coincideNombre = receta.nombre.toLowerCase().includes(busqueda);
            const coincideIngrediente = receta.ingredientes.some((ingrediente) => ingrediente.toLowerCase().includes(busqueda));
            return ((coincideNombre || coincideIngrediente) &&
                (!categoria || receta.categoria === categoria) &&
                (tiempoMaximo === 0 || receta.tiempo <= tiempoMaximo) &&
                (!soloFavoritas || receta.favorita));
        });
        if (orden === "nombre") {
            filtradas = [...filtradas].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
        }
        else if (orden === "tiempo") {
            filtradas = [...filtradas].sort((a, b) => a.tiempo - b.tiempo);
        }
        this.view.actualizarContadores(this.recetas);
        this.view.mostrarRecetas(filtradas, (id) => this.editarReceta(id), (id) => this.eliminarReceta(id), (id) => this.cambiarFavorita(id), (id) => this.imprimirReceta(id));
    }
    guardarDatos() {
        this.storage.guardarRecetas(this.recetas);
    }
}
