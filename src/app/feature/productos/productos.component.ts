import { Component, OnInit } from '@angular/core';
// import * as data from '../../../assets/json/data.json';
import data from 'src/assets/json/data.json';

const PATH_CONSULTA_IMAGENES_LOCAL = "../../../assets/image/";
const PATH_CONSULTA_IMAGENES_PDN = "assets/image/";

export class Subproducto {
  categoria: string;
  nombre: string;
  colores: string[];
  subtipo: string[];
  imagen: string;
  faz: boolean;
  descripcion: string;

  constructor(nombre: string, categoria: string, colores: string[], subtipo: string[], imagen: string){
    this.nombre = nombre;
    this.colores = colores;
    this.imagen = imagen;
    this.categoria = categoria;
    this.subtipo = subtipo;
  }
}

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

export class Medida{
  categoria: string;
  listaTallas: string[];

  constructor(categoria: string, listaTallas: string[]){
    this.categoria = categoria;
    this.listaTallas = listaTallas;
  }
}

export class Tela{
  nombre: string;
  colores: string[];

  constructor(nombre: string, colores: string[]){
    this.nombre = nombre;
    this.colores = colores;
  }
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productosPorCategoria: Producto[];
  public cantidadProductos: number;
  public esDobleFaz: boolean;
  public telas: Tela[] = [];
  public subproductoTemporal: Subproducto[];
  public tallasTemporal: Medida[];
  public pathImagenes: string;

  constructor(){
    // this.productos1.push(new Producto("Sencillo", ["lila","azul oscuro","negro","blanco","rojo"], "../../assets/image/Hoodie/sencillo.png"));
    // this.productos1.push(new Producto("Exclusivo", ["lila","azul oscuro","negro","blanco","rojo"], "../../assets/image/Hoodie/exclusivo.png"));
    // this.productos1.push(new Producto("Junior", ["lila","azul oscuro","negro","blanco","rojo"], "../../assets/image/Hoodie/junior.png"));
    // console.log(this.productos1);
  }

  ngOnInit(): void {
    this.subproductoTemporal = [];
    this.tallasTemporal = [];
    this.obtenerTelas();
    this.obtenerProductos();
    this.productosPorCategoria.forEach(producto => {
      this.subproductoTemporal.push(producto.listaSubproductos[0]);
      this.tallasTemporal.push(producto.talla[0]);
    });
    this.pathImagenes = ProductosComponent.identificarPathImagenes();

    //this.cambioTipoSubproducto({"target":{"value":"sencillo"}}, 1);
  }

  public obtenerTelas(){
    data.color.forEach(element => {
      this.telas.push(new Tela(element.nombre, element.colores));
    });
  }

  public obtenerProductos(){
    let subproductos: Subproducto[];
    let categoria: Producto;
    this.productosPorCategoria = [];
    if(data.productos.length > 0){
      data.productos.forEach(producto => {
        subproductos = [];
        producto.tipo.forEach(tipo => {
          subproductos.push(new Subproducto(tipo.nombre, producto.categoria, this.identificarColoresProducto(tipo.color).sort(), tipo.subtipo, this.generarNombreImagen(tipo.nombre)));
        });
        categoria = new Producto(producto.categoria, subproductos, producto.faz, this.obtenerMedidas(producto.talla));
        categoria.coloresFaz = this.identificarColoresProducto(["Faz"]);
        this.productosPorCategoria.push(categoria);
      });
      // console.log(this.productosPorCategoria);
      this.cantidadProductos = this.productosPorCategoria.length;
    }
  }

  public generarNombreImagen(nombreSubproducto: string): string{
    let nombreImagen = nombreSubproducto.toLowerCase().replaceAll(" ","_").normalize("NFD").replace(/[\u0300-\u036f]/g, "")+".png";
    return nombreImagen;

  }

  public obtenerMedidas(tallaPorCategoria: any): Medida[]{
    let arregloMedidas:Medida[] = [];
    tallaPorCategoria.forEach((element: { categoria: string; talla: string[]; }) => {
      let talla =  new Medida(element.categoria, element.talla);
      arregloMedidas.push(talla);
    });
    return arregloMedidas;
  }

  public identificarColoresProducto(categoriaColor: string[]): string[]{
    let coloresFinales:string[] = [];
    if(categoriaColor.length > 0){
      categoriaColor.forEach(categoria => {
        let coloresTemporales:string[] = [];
        this.telas.forEach(nombreTela =>{
          if( nombreTela.nombre.toLowerCase() == categoria.toLowerCase()){
            coloresTemporales = nombreTela.colores;
          }
        });
        coloresFinales = coloresFinales.concat(coloresTemporales);
      });
    }
    return coloresFinales;
  }

  public cambioTipoSubproducto(value:any, index:number){
    let valor = value.target.value;
    this.productosPorCategoria[index].listaSubproductos.forEach(subproducto => {
        if(subproducto.nombre.toLowerCase() == valor.toLowerCase()){
          // console.log(subproducto);
          this.subproductoTemporal[index] = subproducto;
          this.cambioUser({"target":{"value":subproducto.subtipo[0]}}, index);
          // this.tallasTemporal[index] = this.productosPorCategoria[index].talla;
        }
    });
  }

  public cambioUser(value:any, index:number){
    let valor = value.target.value;
    //console.log(this.productosPorCategoria);
    this.productosPorCategoria[index].talla.forEach(element => {
        if(element.categoria.toLowerCase() == valor.toLowerCase()){
          console.log(element);
          this.tallasTemporal[index] = element;
        }
    });
  }

  static identificarPathImagenes(){
    let ubicacionActual = window.location.href;
    console.log(ubicacionActual);
    return (ubicacionActual.indexOf("localhost") > 0 || ubicacionActual.indexOf("127.0.0.1") > 0) ? PATH_CONSULTA_IMAGENES_LOCAL : PATH_CONSULTA_IMAGENES_PDN
  }

  public mostrarColoresFaz(value:any){
    if(2 == value.target.value){
      this.esDobleFaz = true;
    }
    else{
      this.esDobleFaz = false;
    }
  }
}
