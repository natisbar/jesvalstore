import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menuItems';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  @Input()
  items: MenuItem[];
  imageToolbar:string;

  constructor(private scroller: ViewportScroller){}

  public redirigirEnPagina(id:string){
    this.scroller.scrollToAnchor(id);
  }


  ngOnInit(){
    let ubicacionActual = window.location.href;
    console.log(ubicacionActual)
    if (ubicacionActual.indexOf("localhost") > 0 || ubicacionActual.indexOf("127.0.0.1") > 0){
      this.imageToolbar = '../../../assets/image/jesval_logo.png';
    }
    else {
      this.imageToolbar = "assets/image/jesval_logo.png";
    }
  }

}
