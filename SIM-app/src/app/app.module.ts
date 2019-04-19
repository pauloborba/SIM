import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AlocacaoComponent } from './alocacao/alocacao.component';
import { CorrecaoComponent } from './correcao/correcao.component';
import { LoginComponent } from './login/login.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoService } from './alunos/aluno.service';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    AlocacaoComponent,
    CorrecaoComponent,
    LoginComponent,
    AlunosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'alunos',
        component: AlunosComponent
      }
    ])
  ],
  providers: [AlunoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
