
import { Receta } from "../models/Receta.js";
import { RecetaView } from "../views/RecetaView.js";
import { StorageService } from "../services/StorageService.js";

export class RecetaController {
  private recetas: Receta[];
  private view: RecetaView;
  private storage: StorageService;

  constructor(view: RecetaView, storage: StorageService) {
    this.view = view;
    this.storage = storage;
    this.recetas = this.storage.obtenerRecetas();

    this.view.mostrarPagina();
    this.registrarEventos();
    this.actualizarVista();
  }

  private registrarEventos(): void {
    this.view.obtenerFormulario().addEventListener("submit", (evento) => {
      evento.preventDefault();
      this.guardarReceta();
    });

    document.querySelector("#buscar")!.addEventListener("input", () => {
      this.actualizarVista();
    });

    document.querySelector("#filtro-tiempo")!.addEventListener("change", () => {
      this.actualizarVista();
    });

    document.querySelector("#solo-favoritas")!.addEventListener("change", () => {
      this.actualizarVista();
    });

    document.querySelector("#btn-cancelar")!.addEventListener("click", () => {
      this.view.limpiarFormulario();
      this.view.mostrarMensaje("Edición cancelada.");
    });
  }

  private guardarReceta(): void {
    const idActual = this.view.obtenerValor("receta-id");
    const nombre = this.view.obtenerValor("nombre").trim();

    const ingredientes = this.view.obtenerValor("ingredientes")
      .split(/[,\n]+/)
      .map((ingrediente) => ingrediente.trim())
      .filter((ingrediente) => ingrediente !== "");

    const tiempoTexto = this.view.obtenerValor("tiempo");
    const tiempo = Number(tiempoTexto);

    if (tiempoTexto.trim() === "") {
      this.view.mostrarMensaje("Escribe el tiempo de preparación.");
      return;
    }

    const id = idActual ? Number(idActual) : Date.now();

    const receta = new Receta(
      id,
      nombre,
      ingredientes,
      tiempo,
      this.recetas.find((r) => r.id === id)?.favorita ?? false
    );

    const error = receta.validar();

    if (error) {
      this.view.mostrarMensaje(error);
      return;
    }

    if (idActual) {
      this.recetas = this.recetas.map((r) =>
        r.id === id ? receta : r
      );

      this.view.mostrarMensaje("¡Receta actualizada correctamente!");
    } else {
      this.recetas.push(receta);
      this.view.mostrarMensaje("¡Receta registrada correctamente!");
    }

    this.guardarDatos();
    this.view.limpiarFormulario();
    this.actualizarVista();
  }

  private editarReceta(id: number): void {
    const receta = this.recetas.find((r) => r.id === id);

    if (receta) {
      this.view.prepararEdicion(receta);
      this.view.mostrarMensaje("Modifica los datos de la receta.");
    }
  }

  private eliminarReceta(id: number): void {
    const receta = this.recetas.find((r) => r.id === id);

    if (!receta) {
      return;
    }

    const confirmar = window.confirm(
      `¿Deseas eliminar la receta "${receta.nombre}"?`
    );

    if (!confirmar) {
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

  private cambiarFavorita(id: number): void {
    this.recetas = this.recetas.map((r) => {
      if (r.id === id) {
        return new Receta(
          r.id,
          r.nombre,
          r.ingredientes,
          r.tiempo,
          !r.favorita
        );
      }

      return r;
    });

    this.guardarDatos();
    this.actualizarVista();
  }

  private actualizarVista(): void {
    const busqueda = this.view.obtenerValor("buscar").toLowerCase().trim();
    const tiempoMaximo = Number(this.view.obtenerValor("filtro-tiempo"));
    const soloFavoritas =
      (document.querySelector<HTMLInputElement>("#solo-favoritas")!)
        .checked;

    const filtradas = this.recetas.filter((receta) => {
      const coincideNombre = receta.nombre.toLowerCase().includes(busqueda);

      const coincideIngrediente = receta.ingredientes.some((ingrediente) =>
        ingrediente.toLowerCase().includes(busqueda)
      );

      const coincideBusqueda = coincideNombre || coincideIngrediente;

      const coincideTiempo =
        tiempoMaximo === 0 || receta.tiempo <= tiempoMaximo;

      const coincideFavorita = !soloFavoritas || receta.favorita;

      return coincideBusqueda && coincideTiempo && coincideFavorita;
    });

    this.view.mostrarRecetas(
      filtradas,
      (id) => this.editarReceta(id),
      (id) => this.eliminarReceta(id),
      (id) => this.cambiarFavorita(id)
    );
  }

  private guardarDatos(): void {
    this.storage.guardarRecetas(this.recetas);
  }
}
