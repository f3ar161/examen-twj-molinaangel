import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {GrupoComponent} from "./grupo/grupo.component";
import {MateriaComponent} from "./materia/materia.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'grupo', component: GrupoComponent},
  {path: 'grupo/:idGrupo/materia', component: MateriaComponent},

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
