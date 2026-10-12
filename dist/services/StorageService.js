import { Receta } from "../models/Receta.js";
export class StorageService {
    constructor() {
        this.clave = "gestor-recetas";
    }
    obtenerRecetas() {
        const datos = localStorage.getItem(this.clave);
        if (!datos) {
            return [];
        }
        try {
            const recetas = JSON.parse(datos);
            if (!Array.isArray(recetas)) {
                return [];
            }
            return recetas.map((r) => new Receta(r.id, r.nombre, r.ingredientes, r.tiempo, r.favorita));
        }
        catch {
            return [];
        }
    }
    guardarRecetas(recetas) {
        localStorage.setItem(this.clave, JSON.stringify(recetas));
    }
}
