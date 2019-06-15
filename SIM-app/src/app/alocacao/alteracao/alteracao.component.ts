import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Aula } from '../aula';
import { Monitor } from '../monitor';
import { AulaService } from '../aula.service';
import { MonitorService } from '../monitor.service';

@Component({
  selector: 'app-root',
  templateUrl: './alteracao.component.html',
  styleUrls: ['./alteracao.component.css']
})
export class AlteracaoComponent implements OnInit {
  
  constructor(private aulaService: AulaService, private monitorService: MonitorService) { }

  monitores: Monitor[];
  aulas: Aula[] = [];
  data: string;
  diaSelect: Aula;
  monitoresAlocados: string;
  numPadraoMonitores: number;
  aulaOriginal : string;

  ngOnInit() {
    this.aulaService.getAulas()
    .then(as => this.aulas = as)
    .catch(erro => alert(erro));
    this.monitorService.getMonitores()
    .then(as => this.monitores = as)
    .catch(erro => alert(erro));
    this.aulaService.getNumPadraoMonitores()
    .then(n => this.numPadraoMonitores = n)
    .catch(erro => alert(erro));
  }

  buscar() : void {
    for(var i = 0; i < this.aulas.length; i++) {
      if(this.aulas[i].data == this.data) {
        this.diaSelect = this.aulas[i];
        this.aulaOriginal = this.aulas[i].tipo;
        this.monitoresAlocados = this.monitoresString(this.diaSelect.monitores);
        break;
      }
    }
  }

  monitoresString(monitores: Monitor[]) : string{
    if(monitores.length == 0) {
      return "";
    } else {
      var result:string = "";
      monitores.forEach(m => {
        if(m) result += m.nome + " ";
      })
      return result.substr(0, result.length-1);
    }
  }

  atualizarAula() : void {
    this.diaSelect.monitores = this.getMonitores();
    if(this.diaSelect.tipo != this.aulaOriginal && this.diaSelect.tipo == "Acompanhamento") this.diaSelect.numAlocados = this.numPadraoMonitores;
    this.aulaService.atualizar(this.diaSelect)
    .then(as => {
      if(as) {
        this.diaSelect = undefined;
        this.monitoresAlocados = undefined;
        this.data = "";
        for(var i = 0; i < this.aulas.length; i++) {
          if (this.aulas[i].data == as.data) {
            this.aulas[i] = as;
          }
        }
      }
    })
    .catch(erro => alert(erro));
  }

  getMonitores() : Monitor[]{
    var result = [];
    if (this.monitoresAlocados.indexOf(" ") < 0) {
      result.push(this.monitores.find(e => e.nome == this.monitoresAlocados));
    } else {
      var names = this.monitoresAlocados.split(" ");
      names.forEach(nome => {
        result.push(this.monitores.find(e => e.nome == nome));
      });
    }
    return result;
  }
}
