import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SArticuloFamiliaService {
  resourceURL: string;

  constructor(private httpclient: HttpClient) {
    this.resourceURL =
      'https://labsys.frc.utn.edu.ar:8443/api/ArticulosFamilias';
  }
  get() {
    return this.httpclient.get(this.resourceURL);
  }
}
