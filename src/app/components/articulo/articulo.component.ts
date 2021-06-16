import { CurrencyPipe } from '@angular/common';
import { Attribute } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { ArticuloFamilia } from '../../models/ArticuloFamilia';
import { Articulo } from '../../models/mockArticulo';
import { ArticulosService } from '../../services/articulos.service';
import { MockArticuloService } from '../../services/mock-articulo.service';
import { ArticuloFamiliaService } from '../../services/s-articulo-familia.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  // variable del spinner
  carga: boolean = false;

  //badera para indicar el click en boton grabar
  submited: boolean = false;

  formBusqueda: FormGroup;
  FormRegistro: FormGroup;
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

  // Item de Consultar
  ItemComsulta: Articulo;

  // opciones del combo activo
  OpcionesActivo = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' }
  ];

  constructor(
    // private articulosService: MockArticuloService,
    private articulosFamiliasService: ArticuloFamiliaService,
    private articulosS: ArticulosService,
    private form: FormBuilder
  ) {}

  ngOnInit() {
    this.formBusqueda = this.form.group({
      Nombre: [''],
      Activo: [null]
    });
    this.FormRegistro = this.form.group({
      IdArticulo: [null],
      Nombre: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
      Precio: [null, [Validators.required, Validators.pattern('[0-9]{1,5}([-.]{0,1})([0-9]{0,2})')]],

      Stock: [null, [Validators.required, Validators.pattern('[0-9]{1,10}')]],

      CodigoDeBarra: [
        null,
        [Validators.required, Validators.pattern('[0-9]{13}')]
      ],

      IdArticuloFamilia: [null, [Validators.required]],
      FechaAlta: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          )
        ]
      ],
      Activo: [false]
    });

    this.GetFamiliasArticulos();
  }

  GetFamiliasArticulos() {
    this.articulosFamiliasService.get().subscribe((res: ArticuloFamilia[]) => {
      this.Familias = res;
    });
  }
  // GetById(id: number) {
  //   this.articulosS.getById(id).subscribe((res: Articulo) => {
  //     // this.ItemComsulta = res
  //   });
  // }

  Agregar() {
    this.submited = false;
    this.FormRegistro.markAsUntouched();

    this.AccionABMC = 'A';
    this.FormRegistro.reset({ Activo: true, IdArticulo: 0 });
  }

  // Buscar segun los filtros, establecidos en FormRegistro
  Buscar() {
    this.carga = true;
    this.articulosS
      .get(
        this.formBusqueda.controls.Nombre.value,
        this.formBusqueda.controls.Activo.value,
        this.Pagina
      )
      .subscribe((res: any) => {
        this.Items = res.Items;
        this.RegistrosTotal = res.CantidadDeRgistros;
        this.carga = false;
      },()=>{}
      ,()=>{
        this.carga = false;
      });
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

    this.articulosS.getById(Dto.IdArticulo).subscribe((res: Articulo) => {
      let itemCopy = { ...res };

      var arrFecha = itemCopy.FechaAlta.substr(0, 10).split('-');
      itemCopy.FechaAlta = arrFecha[2] + '/' + arrFecha[1] + '/' + arrFecha[0];

      this.FormRegistro.patchValue(itemCopy);

      this.AccionABMC = AccionABMC;
      this.carga = false;
    });
  }

  Consultar(Dto) {
    this.carga = true;
    this.BuscarPorId(Dto, 'C');
  }

  // comienza la modificacion, luego la confirma con el metodo Grabar
  Modificar(Dto) {
    this.submited = false;
    this.FormRegistro.markAsUntouched();

    if (!Dto.Activo) {
      alert('No puede modificarse un registro Inactivo.');
      return;
    }
    this.carga = true;
    this.BuscarPorId(Dto, 'M');
  }

  // grabar tanto altas como modificaciones
  Grabar() {
    this.submited = true;
    if (this.FormRegistro.invalid) {
      return;
    } 
    else {
      this.carga = true;
      //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
      const itemCopy = { ...this.FormRegistro.value };

      //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
      let arrFecha = itemCopy.FechaAlta.substr(0, 10).split('/');
      if (arrFecha.length == 3)
        itemCopy.FechaAlta = new Date(
          arrFecha[2],
          arrFecha[1] - 1,
          arrFecha[0]
        ).toISOString();

      if (this.AccionABMC === 'M') {
        this.articulosS.put(itemCopy).subscribe(
          (res: Articulo) => {
            this.Buscar();
          },
          (er: any) => {
            alert('erro de datos');
            this.carga = false;
            this.Volver();
          },
          () => {
            alert('Articulo Modificado');
            this.carga = false;
            this.Volver();
          }
        );
      } else {
        itemCopy.IdArticulo = 0;
        this.articulosS.post(itemCopy).subscribe(
          (res: Articulo) => {
            this.Buscar();
          },
          (er: any) => {
            alert('erro de datos');
            this.carga = false;
            this.Volver();
          },
          () => {
            alert('Articulo Guardado');
            this.carga = false;
            this.Volver();
          }
        );
      }
    }
  }

  ActivarDesactivar(Dto) {
    var resp = confirm(
      'Esta seguro de ' +
        (Dto.Activo ? 'desactivar' : 'activar') +
        ' este registro?'
    );
    if (resp === true) alert('registro activado/desactivado!');
  }

  // Volver desde Agregar/Modificar
  Volver() {
    this.submited = false;
    this.AccionABMC = 'L';
    this.limpiarRegistro();
  }

  ImprimirListado() {
    alert('Sin desarrollar...');
  }

  limpiarRegistro() {
    this.FormRegistro.reset({
      IdArticulo: null,
      Nombre: null,
      Precio: null,
      Stock: null,
      CodigoDeBarra: null,
      IdArticuloFamilia: null,
      FechaAlta: null,
      Activo: null
    });
  }
}
