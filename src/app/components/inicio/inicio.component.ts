import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  titulo:string= 'Pyme-Demo 2021'
  constructor() { }

  ngOnInit() {
  }

}