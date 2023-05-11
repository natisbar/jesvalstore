import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/model/cliente';
import { Paths } from 'src/app/shared/Utils/paths';


const CLIENTES: Cliente[] = [
  new Cliente("Cliente 1",
              "Con toda la energía en el trabajo gracias está súper cool.",
              "1.jpeg"),
  new Cliente("Cliente 2",
              "Esta muy bonito muchísimas gracias.",
              "2.jpeg"),
  new Cliente("Cliente 3",
              "El saco me encantó mal, o sea enamoradisima. Es súper abrigadito. Me encanto. En un tiempito vuelvo y les compro otro.",
              "3.jpeg"),
  new Cliente("Cliente 4",
              "Gracias amiga, de aquí tu producto se va para Japón, por eso doble faz... Gracias ya soy cliente para próximas compras ❤️ Excelente producto👌.",
              "4.jpeg"),
  new Cliente("Cliente 5",
              "Los amamamos muchas gracias.",
              "5.jpeg"),
];


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  public informacionCliente: Cliente;
  public clienteActual: number = 0;

  ngOnInit(): void {
    this.informacionCliente = CLIENTES[0];
  }

  public cambiarCliente(valor: number){
    let totalClientes = CLIENTES.length;
    let siguienteCliente = this.clienteActual + valor;
    if (siguienteCliente > (totalClientes-1)){
      this.clienteActual = 0;
    }
    else if (siguienteCliente < 0){
      this.clienteActual = (totalClientes-1);
    }
    else {
      this.clienteActual = siguienteCliente;
    }

    this.informacionCliente = CLIENTES[this.clienteActual];

  }

}
