const DOMINIO_LOCAL = "localhost";
const IP_LOCAL = "127.0.0.1";
const PATH_CONSULTA_IMAGENES = "assets/image/";
const VALOR_RETROCESO_EN_PATH = "../";

export class Paths{
  static pathConsultaImagenesLocal: string;

  constructor(){

  }

  static identificarPathImagenes(cantidadRetroceso: number){
    let ubicacionActual = window.location.href;
    let stringRetroceso = "";
    for(let i = 0; i < cantidadRetroceso; i++){
      stringRetroceso = stringRetroceso + VALOR_RETROCESO_EN_PATH;
    }
    this.pathConsultaImagenesLocal = stringRetroceso + PATH_CONSULTA_IMAGENES;
    return (ubicacionActual.indexOf(DOMINIO_LOCAL) > 0 || ubicacionActual.indexOf(IP_LOCAL) > 0) ? this.pathConsultaImagenesLocal : PATH_CONSULTA_IMAGENES
  }

}
