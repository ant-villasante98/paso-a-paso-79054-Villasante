import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ArticulosService {
  resourceURL: string;
  constructor(private httpClient: HttpClient) {
    this.resourceURL = 'https://localhost:44320/api/articulos';
  }
  get(Nombre: string, Activo: boolean, pagina: number) {
    let param = new HttpParams();
    if (Nombre != null) {
      param = param.append('nom', Nombre);
    }
    if (Activo != null) {
      param = param.append('act', Activo.toString());
    }
    param = param.append('pagina', pagina.toString());
    return this.httpClient.get(this.resourceURL, { params: param });
  }
  getById(id :number ){
    let param = new HttpParams();
    param = param.append('id',id.toString());
    return this.httpClient.get(this.resourceURL
    // +'/'+id.toString()
    ,{params:param}
    )
  }
}
