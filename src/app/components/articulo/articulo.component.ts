import { Component, OnInit } from '@angular/core';
import { ArticuloFamilia } from '../../models/ArticuloFamilia';
import { Articulo } from '../../models/mockArticulo';
import { MockArticuloService } from '../../services/mock-articulo.service';
import { ArticuloFamiliaService } from '../../services/s-articulo-familia.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  Titulo = 'Articulos';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)'
  };
  AccionABMC = 'L'; // inicialmente inicia en el listado de articulos (buscar con parametros)
  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...'
  };
  Items: Articulo[] = null;
  RegistrosTotal: number;
  Familias: ArticuloFamilia[] = null;
  Pagina = 1; // inicia pagina 1

  // opciones del combo activo
  OpcionesActivo = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' }
  ];

  constructor(
       private articulosService: MockArticuloService,
    private articulosFamiliasService: ArticuloFamiliaService,
  ) {}

  ngOnInit() {
    this.GetFamiliasArticulos();
  }
  GetFamiliasArticulos() {
         this.articulosFamiliasService.get().subscribe((res: ArticuloFamilia[]) => {
       this.Familias = res;
     });
  }

  Agregar() {
    this.AccionABMC = "A";
  }

  // Buscar segun los filtros, establecidos en FormRegistro
  Buscar() {
     this.articulosService
      .get('', null, this.Pagina)
      .subscribe((res: any) => {
        this.Items = res.Items;
        this.RegistrosTotal = res.RegistrosTotal;
      });
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll
    this.AccionABMC = AccionABMC;
  }

  Consultar(Dto) {
    this.BuscarPorId(Dto, "C");
  }

  // comienza la modificacion, luego la confirma con el metodo Grabar
  Modificar(Dto) {
    if (!Dto.Activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    this.BuscarPorId(Dto, "M");
  }

  // grabar tanto altas como modificaciones
  Grabar() {
    alert("Registro Grabado!");
    this.Volver();
  }

  ActivarDesactivar(Dto) {
    var resp = confirm(
      "Esta seguro de " +
        (Dto.Activo ? "desactivar" : "activar") +
        " este registro?");
    if (resp === true)
      alert("registro activado/desactivado!");
  }

  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = "L";
  }

  ImprimirListado() {
    alert('Sin desarrollar...');
  }

}
