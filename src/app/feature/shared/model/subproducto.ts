export class Subproducto {
  categoria: string;
  nombre: string;
  colores: string[];
  subtipo: string[];
  imagen: string;
  descripcion: string;

  constructor(nombre: string, categoria: string, colores: string[], subtipo: string[], imagen: string, descripcion: string){
    this.nombre = nombre;
    this.colores = colores;
    this.imagen = imagen;
    this.categoria = categoria;
    this.subtipo = subtipo;
    this.descripcion = descripcion;
  }
}
