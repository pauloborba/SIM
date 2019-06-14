import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlocacaoComponent} from './alocacao/alocacao.component'
const routes: Routes = [
  {path: 'alocacao', loadChildren: './alocacao/alocacao.module#AlocacaoModule'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
