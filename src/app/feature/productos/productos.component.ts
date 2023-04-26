import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import data from 'src/assets/json/data.json';
import { Medida } from '../shared/model/medida';
import { Producto } from '../shared/model/producto';
import { Subproducto } from '../shared/model/subproducto';
import { Tela } from '../shared/model/tela';

const PATH_CONSULTA_IMAGENES_LOCAL = "../../../assets/image/";
const PATH_CONSULTA_IMAGENES_PDN = "assets/image/";

export class Requeridos{
  // categoria: string;
  // tipoProducto: string;
  tipoUsuario: boolean;
  talla: boolean;
  color: boolean;
  faz: boolean;
  colorFaz: boolean;

  constructor(tipoUsuario: boolean, talla: boolean, color: boolean, faz: boolean){
    // this.categoria = categoria;
    // this.tipoProducto = tipoProducto;
    this.tipoUsuario = tipoUsuario;
    this.talla = talla;
    this.color = color;
    this.faz = faz;
  }
}


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public formProductos: FormGroup;
  public productosPorCategoria: Producto[];
  public cantidadProductos: number;
  public esDobleFaz: boolean;
  public telas: Tela[] = [];
  public subproductoTemporal: Subproducto[];
  public tallasTemporal: Medida[];
  public pathImagenes: string;
  public mensajeWhatsapp: string;
  public datosRequeridos: Requeridos[];
  public mensaje: string;

  constructor(){
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
    this.construirFormulario();
    //this.cambioTipoSubproducto({"target":{"value":"sencillo"}}, 1);
  }

  public iniciarSolicitud(categoriaPrincipal:string, index:number){
    console.log(this.formProductos.value);
    if (this.formProductos.valid){
      this.mensaje = `Hola, estoy interesada en un(a) ${categoriaPrincipal}
      Tipo: ${this.formProductos.value.tipoProducto}
      ${(this.formProductos.value.tipoUsuario != null) ? "Para: " + this.formProductos.value.tipoUsuario : ""}
      ${(this.formProductos.value.talla != null) ? "Talla: " + this.formProductos.value.talla : ""}
      ${(this.formProductos.value.color != null) ? "Color: " + this.formProductos.value.color : ""}
      ${(this.formProductos.value.faz != null) ? "Faz: " + this.formProductos.value.faz  : ""}
      ${(this.formProductos.value.colorFaz != null) ? "Color Faz: " + this.formProductos.value.colorFaz  : ""} `;
      console.log(this.mensaje);

      window.open("https://wa.me/+573219654214?text="+ this.mensaje, '_blank');


    }
    console.log(this.mensaje);
    // console.log(categoriaPrincipal);

    // console.log(this.formProductos.valid);
  }

  public construirFormulario(){
    this.formProductos = new FormGroup({
      tipoProducto: new FormControl(null),
      tipoUsuario: new FormControl(null),
      talla: new FormControl(null),
      color: new FormControl(null),
      faz: new FormControl(null),
      colorFaz: new FormControl(null)
    });

    // this.formProductos.get('tipoProducto')?.valueChanges
    //   .subscribe(value => {
    //     console.log(value)
    //   });
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
    this.formProductos.reset();
    this.formProductos.get("tipoProducto")?.setValue(valor);
    this.productosPorCategoria[index].listaSubproductos.forEach(subproducto => {
        if(subproducto.nombre.toLowerCase() == valor.toLowerCase()){
          // console.log(subproducto);
          let fieldRequeridos = this.obtenerFieldRequeridos(subproducto, this.productosPorCategoria[index].faz);
          this.cambiarFieldRequeridos(fieldRequeridos);
          console.log(fieldRequeridos);
          this.subproductoTemporal[index] = subproducto;
          this.cambioUser({"target":{"value":subproducto.subtipo[0]}}, index);
          // this.tallasTemporal[index] = this.productosPorCategoria[index].talla;
        }
    });
  }

  public cambiarFieldRequeridos(fieldRequeridos: Requeridos){
    (fieldRequeridos.tipoUsuario) ? this.formProductos.get("tipoUsuario")?.setValidators([Validators.required]) : this.formProductos.get("tipoUsuario")?.setValidators(null);
    this.formProductos.get("tipoUsuario")?.updateValueAndValidity();
    (fieldRequeridos.talla) ? this.formProductos.get("talla")?.setValidators([Validators.required]) : this.formProductos.get("talla")?.setValidators(null);
    this.formProductos.get("talla")?.updateValueAndValidity();
    (fieldRequeridos.color) ? this.formProductos.get("color")?.setValidators([Validators.required]) : this.formProductos.get("color")?.setValidators(null);
    this.formProductos.get("color")?.updateValueAndValidity();
    (fieldRequeridos.faz) ? this.formProductos.get("faz")?.setValidators([Validators.required]) : this.formProductos.get("faz")?.setValidators(null);
    this.formProductos.get("faz")?.updateValueAndValidity();
    this.formProductos.get("colorFaz")?.setValidators(null);
    this.formProductos.get("colorFaz")?.updateValueAndValidity();
  }

  public obtenerFieldRequeridos(subproducto: Subproducto, faz: boolean){
    return new Requeridos(subproducto.subtipo.length > 0, subproducto.subtipo.length > 0, subproducto.colores.length > 0, faz);
  }

  public cambioUser(value:any, index:number){
    let valor = value.target.value;
    //console.log(this.productosPorCategoria);
    this.productosPorCategoria[index].talla.forEach(element => {
        if(element.categoria.toLowerCase() == valor.toLowerCase()){
          // console.log(element);
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
      this.formProductos.get("colorFaz")?.setValidators([Validators.required])
    }
    else{
      this.esDobleFaz = false;
      this.formProductos.get("colorFaz")?.setValidators(null)
    }
    this.formProductos.get("colorFaz")?.updateValueAndValidity();
  }
}
