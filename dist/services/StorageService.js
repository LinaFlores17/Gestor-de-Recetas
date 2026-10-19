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
            return recetas.map((dato) => {
                const r = dato;
                const categorias = ["Desayuno", "Almuerzo", "Cena"];
                const categoria = categorias.includes(r.categoria)
                    ? r.categoria
                    : "Cena";
                return new Receta(Number(r.id), String(r.nombre ?? ""), Array.isArray(r.ingredientes) ? r.ingredientes.map(String) : [], Number(r.tiempo), Boolean(r.favorita), categoria, Number(r.porciones) > 0 ? Number(r.porciones) : 1);
            });
        }
        catch {
            return [];
        }
    }
    guardarRecetas(recetas) {
        localStorage.setItem(this.clave, JSON.stringify(recetas));
    }
}
