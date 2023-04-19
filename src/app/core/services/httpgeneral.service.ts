import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpgeneralService {

  constructor(public http: HttpClient) {}

  public doPost(endpoint: string, apiRoute: string, body: any){
    return this.http.post(`${endpoint + apiRoute}`, body, {headers: this.getHttpHeaders()})
  }

  public doGet<T>(url: string, data: any){
    return this.http.get<T>(url, {params: data})
  }

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders().set('xhr-name', 'consultar registros');
  }
}
