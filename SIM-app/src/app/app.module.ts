import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SubmissaoService} from './submissoes/submissao.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CorrecaoComponent } from './correcao/correcao.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {SubemissoesComponent} from './submissoes/submissoes.component'

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,  
    CorrecaoComponent,
    LoginComponent,
    SubemissoesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [SubmissaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
