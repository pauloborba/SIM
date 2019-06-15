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
  monitorSelect: Monitor;
  nomeMonitor: string;

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

  buscarMonitor() : void {
    this.monitorSelect = this.monitores.find(m => m.nome == this.nomeMonitor);
  }

  atualizarMonitor() : void {
    if(typeof this.monitorSelect.restricoes === "string")
      this.monitorSelect.restricoes = this.getRestricoes();
    this.monitorService.atualizar(this.monitorSelect)
    .then(as => {
      if(as) {
        this.monitorSelect = undefined;
        this.nomeMonitor = "";
        for(var i = 0; i < this.monitores.length; i++) {
          if (this.monitores[i].nome == as.nome) {
            this.monitores[i] = as;
          }
        }
        this.retirarAlocacoes(as);
      }
    })
    .catch(erro => alert(erro));
  }

  getRestricoes() : string[]{
    var result = [];
    if(this.monitorSelect.restricoes == [""]) return result
    else if (this.monitorSelect.restricoes.indexOf(",") < 0) {
      result.push(this.monitorSelect.restricoes);
    } else {
      var rest = this.monitorSelect.restricoes.toString();
      result = rest.split(",");
    }
    return result;
  }

  retirarAlocacoes(monitor: Monitor) : void {
    this.aulaService.getAulas()
    .then(as => this.aulas = as)
    .catch(erro => alert(erro));
    this.aulas.forEach(aula => {
      if(!monitor.disponibilidade[this.getDia(aula.diaSemana)] && this.monitorAlocado(monitor, aula)) {
        aula.monitores.splice(aula.monitores.findIndex(m => m.nome == monitor.nome));
        this.aulaService.atualizar(aula)
        .then(a => {
          if(a) {
            for(var i = 0; i < this.aulas.length; i++) {
              if (this.aulas[i].data == a.data) {
                this.aulas[i] = a;
              }
            }
          }
        })
      }
    })
  }

  getDia(dia: string) : number {
    if(dia == "segunda-feira") return 0;
    else if (dia == "terca-feira") return 1;
    else if (dia == "quarta-feira") return 2;
    else if (dia == "quinta-feira") return 3;
    else return 4;
  }

  monitorAlocado(monitor: Monitor, aula: Aula) : boolean {
    return aula.monitores.findIndex(m => m.nome == monitor.nome) > -1;
  }
}
