import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ArticuloFamiliaComponent } from './components/articulo-familia/articulo-familia.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { ArticuloFamiliaService } from './services/s-articulo-familia.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRouterModule } from './app-router/app-router.module';
import { NotFountComponent } from './components/not-fount/not-fount.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { MockArticuloService } from './services/mock-articulo.service';
import { ArticulosService } from './services/articulos.service';
import {
  NgbPaginationModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ModalDialogService } from './services/modal-dialog.service';
@NgModule({
  entryComponents: [ModalDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    NgbModalModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    InicioComponent,
    ArticuloFamiliaComponent,
    MenuComponent,
    NotFountComponent,
    ArticuloComponent,
    ModalDialogComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    ArticuloFamiliaService,
    MockArticuloService,
    ArticulosService,
    ModalDialogService
  ]
})
export class AppModule {}
