import { Aula } from '../SIM-app/src/app/alocacao/aula';
import { Monitor } from '../SIM-app/src/app/alocacao/monitor';

var copyFrom = function(from: Aula): void {
  this.hora = from.hora;
  this.tipo = from.tipo;
  this.data = from.data;
  this.diaSemana = from.diaSemana;
  this.numAlocados = from.numAlocados;
  this.monitores = from.monitores;
  this.soChefe = from.soChefe;
}

var clean = function() : void {
  this.hora = "";
  this.tipo = "";
  this.data = "";
  this.diaSemana = "";
  this.numAlocados = 0;
  this.monitores = [];
  this.soChefe = false;
}

export class CadastroAulas {
  aulas: Aula[] = [
    {
      hora: "08:00",
      tipo: "Assunto Novo",
      data: "25/03",
      diaSemana: "segunda-feira",
      numAlocados: 0,
      monitores: [
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
          copyFrom: new Monitor().copyFrom,
          copyDisponibilidade: new Monitor().copyDisponibilidade,
          copyRestricoes: new Monitor().copyRestricoes
        }
      ],
      soChefe: false,
      clean: clean,
      copyFrom: copyFrom
    },
    {
      hora: "08:00",
      tipo: "Acompanhamento",
      data: "24/03",
      diaSemana: "terça-feira",
      numAlocados: 1,
      monitores: [],
      soChefe: false,
      clean: clean,
      copyFrom: copyFrom
    }
  ];
  padraoMonitores: number = 4;

  criar(aula: Aula): Aula {
    return new Aula();
  }

  atualizar(aula: Aula) : Aula {
    var result : Aula = this.aulas.find(a => a.data == aula.data);
    if (result) result.copyFrom(aula);
    return result;
  }

  atualizarPadraoMonitores(padrao: number) : number{
    return this.padraoMonitores = padrao;
  }
  
  getAulas() : Aula[] {
    return this.aulas;
  }

  getPadraoMonitores() : number{
    return this.padraoMonitores;
  }
}