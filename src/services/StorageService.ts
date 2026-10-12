import { Receta } from "../models/Receta.js";

export class StorageService {
  private clave = "gestor-recetas";

  obtenerRecetas(): Receta[] {
    const datos = localStorage.getItem(this.clave);

    if (!datos) {
      return [];
    }

    try {
      const recetas: unknown = JSON.parse(datos);

      if (!Array.isArray(recetas)) {
        return [];
      }

      return recetas.map((r: Receta) => new Receta(
        r.id,
        r.nombre,
        r.ingredientes,
        r.tiempo,
        r.favorita
      ));
    } catch {
      return [];
    }
  }

  guardarRecetas(recetas: Receta[]): void {
    localStorage.setItem(
      this.clave,
      JSON.stringify(recetas)
    );
  }
}
