import { Component, OnInit } from '@angular/core';
import {Aula} from '../aula';
import {AulaService} from '../aula.service'
import {Monitor} from '../monitor';
@Component({
  selector: 'app-root',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  constructor(private aulaService:AulaService) { }
  aula: Aula = new Aula();
  aulas : Aula[];
  monitoresStr: string;
  
  ngOnInit() {
    this.aulaService.getAulas()
    .then(as => this.aulas = as)
    .catch(erro => alert(erro));
  }

  criarAula() : void {
    this.atribuirMonitores();
    
    this.aulaService.criar(this.aula)
    .then(ab => {
      if(ab) {
        this.aulas.push(ab);
        this.aula = new Aula();
        this.monitoresStr = "";
      }
    })
    .catch(erro => alert(erro));
  }

  atribuirMonitores() : void {
    if (this.monitoresStr == undefined) {
      this.aula.monitores = [];
    } else  {
      this.monitoresStr.split(" ").forEach(e => this.aula.monitores.push({
        nome: e,
        disponibilidade: [true, true, false, false, false],
        restricoes: [],
        alocacoes: 0,
        chefe: false,
        clean: undefined
      }));
    }
  }
}
