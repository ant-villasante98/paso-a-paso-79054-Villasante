import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ArticuloFamiliaComponent } from './articulo-familia/articulo-familia.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    InicioComponent,
    ArticuloFamiliaComponent,
    MenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
