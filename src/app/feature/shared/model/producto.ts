import { Medida } from "./medida";
import { Subproducto } from "./subproducto";

export class Producto {
  nombre: string;
  listaSubproductos: Subproducto[];
  faz: boolean;
  talla: Medida[];
  coloresFaz: string[];

  constructor(nombre: string, listaSubproductos: Subproducto[], faz: boolean, talla: Medida[]){
    this.nombre = nombre;
    this.listaSubproductos = listaSubproductos;
    this.faz = faz;
    this.talla = talla;
  }
}
