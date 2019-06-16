import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import {SubemissoesComponent} from './submissoes/submissoes.component'
const routes: Routes = [
  {path: 'alocacao', loadChildren: './alocacao/alocacao.module#AlocacaoModule'},
  {path: 'feedback', component: FeedbackComponent} ,
  {path: 'submissoes', component: SubemissoesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
