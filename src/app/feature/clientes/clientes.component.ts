import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/model/cliente';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { environment } from 'src/environments/environment';
import { ResponseRequest } from 'src/app/shared/models/responseRequest';

const params = {
  majorDimension: environment.majorDimension,
  key: environment.key
};


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  public informacionCliente: Cliente;
  public clienteActual: number = 0;
  public responseRequest!: ResponseRequest;
  public clientes: Cliente[] = [];

  constructor(protected clienteService: ClienteService){}

  ngOnInit(): void {
    this.obtenerClientes();
  }


  obtenerClientes(){
    this.clienteService.obtenerClientes(environment.endpoint, environment.apiRoute, params).subscribe(response => {
      this.clientes = this.mapearArrayOfertas(response);
      this.informacionCliente = this.clientes[0];
    });
  }


  private mapearArrayOfertas(response: ResponseRequest){
    let arrayDeObjetos = [];
    for (let index = 1; index < response.values.length; index++) {
      const element = response.values[index];
      if(element.length == 2 && this.validarColumnasNoVacias(element)){
        let oferta = new Cliente(element[0], element[1]);
          arrayDeObjetos.push(oferta);
      }

    }
    // console.log("Zonas: " + this.zonasDelResponse);
    return arrayDeObjetos;
  }

  public validarColumnasNoVacias(element: any){
    return element[0].length>0 && element[1].length>0;
  }

  public cambiarCliente(valor: number){
    let totalClientes = this.clientes.length;
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

    this.informacionCliente = this.clientes[this.clienteActual];

  }

}
