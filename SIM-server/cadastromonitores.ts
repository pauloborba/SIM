import { Monitor } from '../SIM-app/src/app/alocacao/monitor';

var clean = function() : void {
  this.nome = "";
  this.disponibilidade = [false,false,false,false,false];
  this.restricoes = [];
  this.alocacoes = 0;
  this.chefe = false;
}

var copyFrom = function(from: Monitor): void{
  this.nome = from.nome;
  this.copyDisponibilidade(from.disponibilidade);
  this.copyRestricoes(from.restricoes);
  this.alocacoes = from.alocacoes;
  this.chefe = from.chefe
}

var copyDisponibilidade = function(from: boolean[]) : void {
  this.disponibilidade = [false, false, false, false, false];
  for(var i = 0; i < from.length; i++) {
      this.disponibilidade[i] = from[i];
  }
}

var copyRestricoes = function(from: string[]) : void {
  this.restricoes = [];
  for(var i = 0; i < from.length; i++) {
      if(from[i] != "") this.restricoes[i] = from[i];
  }
}
export class CadastroMonitores {
  monitores: Monitor[] = [
    {
      nome: "Daniel",
      disponibilidade: [true,false,true,false,false],
      restricoes: [
        "23/03",
        "25/07"
      ],
      alocacoes: 1,
      chefe: true,
      clean: clean,
      copyFrom: copyFrom,
      copyDisponibilidade: copyDisponibilidade,
      copyRestricoes: copyRestricoes
    },
    {
      nome: "Ruy",
      disponibilidade: [true,false,false,false,false],
      restricoes: [],
      alocacoes: 0,
      chefe: true,
      clean: clean,
      copyFrom: copyFrom,
      copyDisponibilidade: copyDisponibilidade,
      copyRestricoes: copyRestricoes
    }
  ];

  criar(monitor: Monitor): Monitor {
    var result = null;
    if(this.naoCadastrado(monitor.nome)) {
      result = new Monitor();
      result.copyFrom(monitor);
      this.monitores.push(result);
    }
    return result;
  }

  atualizar(monitor: Monitor) : Monitor {
    var result : Monitor = this.monitores.find(m => m.nome == monitor.nome);
    if (result) result.copyFrom(monitor);
    return result;
  }

  getMonitores() : Monitor[] {
    return this.monitores;
  }

  naoCadastrado(nome: string) {
    return !this.monitores.find(a => a.nome == nome);
  }

}