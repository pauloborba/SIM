import { Aula } from '../SIM-app/src/app/alocacao/aula';

export class CadastroAulas {
  aulas: Aula[] = [
    {
      hora: "08:00",
      tipo: "Acompanhamento",
      data: "25/03",
      diaSemana: "segunda-feira",
      numAlocados: 0,
      monitores: [],
      soChefe: false,
      clean: undefined
    },
    {
      hora: "08:00",
      tipo: "Acompanhamento",
      data: "24/03",
      diaSemana: "terça-feira",
      numAlocados: 1,
      monitores: [],
      soChefe: false,
      clean: undefined
    }
  ];

  criar(aula: Aula): Aula {
    return new Aula();
  }

  atualizar(aula: Aula) : Aula {
    var result = null;
    for(var i = 0; i < this.aulas.length; i++) {
      if(this.aulas[i].data == aula.data) {
        this.aulas[i] = aula;
        result = aula;
        break;
      }
    }
    return result;
  }
  
  getAulas() : Aula[] {
    return this.aulas;
  }
}