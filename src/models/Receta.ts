
export class Receta {
  id: number;
  nombre: string;
  ingredientes: string[];
  tiempo: number;
  favorita: boolean;

  constructor(
    id: number,
    nombre: string,
    ingredientes: string[],
    tiempo: number,
    favorita: boolean = false
  ) {
    this.id = id;
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.tiempo = tiempo;
    this.favorita = favorita;
  }

  validar(): string | null {
    if (this.nombre.trim() === "") {
      return "Escribe el nombre de la receta.";
    }

    if (this.ingredientes.length === 0) {
      return "Agrega al menos un ingrediente.";
    }

    if (
      !Number.isFinite(this.tiempo) ||
      this.tiempo <= 0 ||
      !Number.isInteger(this.tiempo)
    ) {
      return "El tiempo debe ser un número entero mayor que cero.";
    }

    return null;
  }
}
