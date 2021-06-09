import { Component, OnInit } from '@angular/core';
import { ArticuloFamilia } from '../../models/ArticuloFamilia';
import { SArticuloFamiliaService } from '../../services/s-articulo-familia.service';

@Component({
  selector: 'app-articulo-familia',
  templateUrl: './articulo-familia.component.html',
  styleUrls: ['./articulo-familia.component.css']
})
export class ArticuloFamiliaComponent implements OnInit {
  titulo: string = 'Articulos Familia';
  Items: ArticuloFamilia[] = [];

  constructor(private AFService: SArticuloFamiliaService) {}

  ngOnInit() {
    this.GetArticulosFamilia();
  }

  GetArticulosFamilia() {
    this.AFService.get().subscribe((res: ArticuloFamilia[]) => {
      this.Items = res;
    });
  }
}
