export class Receta {
    constructor(id, nombre, ingredientes, tiempo, favorita = false, categoria = "Cena", porciones = 1) {
        this.id = id;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.tiempo = tiempo;
        this.favorita = favorita;
        this.categoria = categoria;
        this.porciones = porciones;
    }
    validar() {
        if (this.nombre.trim() === "") {
            return "Escribe el nombre de la receta.";
        }
        if (this.ingredientes.length === 0) {
            return "Agrega al menos un ingrediente.";
        }
        if (this.ingredientes.some(ingrediente => ingrediente.trim() === "")) {
            return "Revisa los ingredientes.";
        }
        if (!Number.isInteger(this.tiempo) ||
            this.tiempo <= 0) {
            return "El tiempo debe ser un número entero mayor que cero.";
        }
        if (!Number.isInteger(this.porciones) ||
            this.porciones <= 0) {
            return "Las porciones deben ser un número entero mayor que cero.";
        }
        if (!["Desayuno", "Almuerzo", "Cena"].includes(this.categoria)) {
            return "Selecciona una categoría válida.";
        }
        return null;
    }
}
