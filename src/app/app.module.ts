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

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRouterModule],
  declarations: [
    AppComponent,
    HelloComponent,
    InicioComponent,
    ArticuloFamiliaComponent,
    MenuComponent,
    NotFountComponent,
    ArticuloComponent
  ],
  bootstrap: [AppComponent],
  providers: [ArticuloFamiliaService, MockArticuloService, ArticulosService, ReactiveFormsModule,FormsModule]
})
export class AppModule {}
