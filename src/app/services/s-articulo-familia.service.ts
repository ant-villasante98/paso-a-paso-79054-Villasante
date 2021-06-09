import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SArticuloFamiliaService {
  resourceURL: string;

  constructor(private httpclient: HttpClient) {
    this.resourceURL = 'https://localhost:44320/api/ArticulosFamilias';
  }
  get() {
    return this.httpclient.get(this.resourceURL);
  }
}
