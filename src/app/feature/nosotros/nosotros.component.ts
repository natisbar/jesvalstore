import { Component, OnInit } from '@angular/core';

const PATH_CONSULTA_IMAGENES_LOCAL = "../../assets/image/img_seccion1.jpg";
const PATH_CONSULTA_IMAGENES_PDN = "assets/image/img_seccion1.jpg";

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  public pathImagenes: string;

  static identificarPathImagenes(){
    let ubicacionActual = window.location.href;
    console.log(ubicacionActual);
    return (ubicacionActual.indexOf("localhost") > 0 || ubicacionActual.indexOf("127.0.0.1") > 0) ? PATH_CONSULTA_IMAGENES_LOCAL : PATH_CONSULTA_IMAGENES_PDN
  }

  ngOnInit(): void {
    this.pathImagenes = NosotrosComponent.identificarPathImagenes();
  }
}
