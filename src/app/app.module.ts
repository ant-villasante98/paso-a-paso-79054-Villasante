import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ArticuloFamiliaComponent } from './components/articulo-familia/articulo-familia.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { ArticuloFamiliaService } from './services/s-articulo-familia.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRouterModule } from './app-router/app-router.module';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRouterModule],
  declarations: [
    AppComponent,
    HelloComponent,
    InicioComponent,
    ArticuloFamiliaComponent,
    MenuComponent
  ],
  bootstrap: [AppComponent],
  providers: [ArticuloFamiliaService]
})
export class AppModule {}
