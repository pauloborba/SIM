import { NgModule}       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {AlocacaoRoutingModule} from './alocacao-routing.module'
import {AlocacaoComponent} from './alocacao.component'
import {CronogramaComponent} from './cronograma/cronograma.component'
import {DisponibilidadeComponent} from './disponibilidade/disponibilidade.component'
import {FormularioComponent} from './formulario/formulario.component'
import {AlteracaoComponent} from './alteracao/alteracao.component'


@NgModule({
    imports: [
        CommonModule,
        AlocacaoRoutingModule
    ],
    declarations: [
       AlocacaoComponent,
       CronogramaComponent,
       DisponibilidadeComponent,
       FormularioComponent,
       AlteracaoComponent
    ]
})
export class AlocacaoModule {}