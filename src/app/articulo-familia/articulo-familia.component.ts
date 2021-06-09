import { Component, OnInit } from '@angular/core';
import { ArticuloFamilia } from '../models/ArticuloFamilia';

@Component({
  selector: 'app-articulo-familia',
  templateUrl: './articulo-familia.component.html',
  styleUrls: ['./articulo-familia.component.css']
})
export class ArticuloFamiliaComponent implements OnInit {
  titulo:string ='Articulos Familia';
  Items:ArticuloFamilia;
  constructor() {}

  ngOnInit() {}
}
