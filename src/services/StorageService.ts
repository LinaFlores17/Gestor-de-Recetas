import { Receta, type Categoria } from "../models/Receta.js";

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

      return recetas.map((dato: unknown) => {
        const r = dato as Partial<Receta>;

        const categorias: Categoria[] = ["Desayuno", "Almuerzo", "Cena"];

        const categoria = categorias.includes(r.categoria as Categoria)
          ? (r.categoria as Categoria)
          : "Cena";

        return new Receta(
          Number(r.id),
          String(r.nombre ?? ""),
          Array.isArray(r.ingredientes) ? r.ingredientes.map(String) : [],
          Number(r.tiempo),
          Boolean(r.favorita),
          categoria,
          Number(r.porciones) > 0 ? Number(r.porciones) : 1,
        );
      });
    } catch {
      return [];
    }
  }

  guardarRecetas(recetas: Receta[]): void {
    localStorage.setItem(this.clave, JSON.stringify(recetas));
  }
}
