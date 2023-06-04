import { Injectable } from '@angular/core';
import { HttpgeneralService } from '../../core/services/httpgeneral.service';
import { ResponseRequest } from '../models/responseRequest';

@Injectable()
export class ClienteService {

  constructor(protected http: HttpgeneralService) {}

  public obtenerClientes(endpoint: string, apiRoute: string, data: any){
    return this.http.doGet<ResponseRequest>(`${endpoint + apiRoute}`, data);
  }

  // public guardar(endpoint: string, body: any, options?: any){
  //   return this.http.doPost(endpoint, body, options);
  // }
}
