import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Paths } from 'src/app/shared/Utils/paths';

const NOMBRE_IMAGEN = "img_seccion1.jpg";

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  public pathImagenes: string;

  constructor(private scroller: ViewportScroller){}

  public redirigirEnPagina(id:string){
    console.log(id);
    this.scroller.scrollToAnchor(id);
  }

  ngOnInit(): void {
    this.pathImagenes = Paths.identificarPathImagenes(2) + NOMBRE_IMAGEN;
  }
}
