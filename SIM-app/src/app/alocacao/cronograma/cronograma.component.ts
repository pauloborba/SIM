import { Component, OnInit } from '@angular/core';
import { Aula } from '../aula';
import { AulaService } from '../aula.service';

@Component({
  selector: 'app-root',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent implements OnInit {

  constructor(private aulaService: AulaService) { }

  aulas: Aula[] = [];
  padraoMonitores: number;
  inputPadrao: number;

  ngOnInit() {
    this.padraoMonitores = 4;
    this.aulaService.getAulas()
    .then(as => this.aulas = as)
    .catch(erro => alert(erro));
  }

  atualizarPadrao() : void {
    this.padraoMonitores = this.inputPadrao;
    this.aulas.forEach(aula => {
      aula.numAlocados = this.padraoMonitores;
      this.aulaService.atualizar(aula)
      .then(a => aula = a)
      .catch(erro => alert(erro));
    });
  }

}
