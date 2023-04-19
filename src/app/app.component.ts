import { Component } from '@angular/core';
import { MenuItem } from './core/models/menuItems';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jesvalstore';
  public opciones: MenuItem[] = [
    {idUbicacion: '#nosotros', nombre: 'Nosotros'},
    {idUbicacion: '#productos', nombre: 'Productos'},
    {idUbicacion: '#clientes', nombre: 'Clientes'},
    {idUbicacion: '#dudas', nombre: 'Dudas'}
  ];
}
