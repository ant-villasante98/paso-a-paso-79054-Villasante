import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ArticuloFamiliaComponent } from './components/articulo-familia/articulo-familia.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { SArticuloFamiliaService } from './services/s-articulo-familia.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    InicioComponent,
    ArticuloFamiliaComponent,
    MenuComponent
  ],
  bootstrap: [AppComponent],
  providers: [SArticuloFamiliaService]
})
export class AppModule {}
