import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloFamiliaComponent } from '../components/articulo-familia/articulo-familia.component';
import { ArticuloComponent } from '../components/articulo/articulo.component';
import { InicioComponent } from '../components/inicio/inicio.component';
import { NotFountComponent } from '../components/not-fount/not-fount.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'articulosfamilias', component: ArticuloFamiliaComponent },
  { path: 'articulos', component: ArticuloComponent },
  { path: '**', component: NotFountComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
