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
      clean: undefined,
    },
    {
      hora: "08:00",
      tipo: "Acompanhamento",
      data: "27/03",
      diaSemana: "quarta-feira",
      numAlocados: 0,
      monitores: [],
      soChefe: false,
      clean: undefined
    }
  ];

  criar(aula: Aula): Aula {
    return new Aula();
  }

  atualizar(aula: Aula) : Aula {
    var result: Aula = new Aula();
    result = this.aulas.find(a => a.data == aula.data);
    if (result) {
      result.hora = aula.hora;
      result.tipo = aula.tipo;
      result.data = aula.data;
      result.diaSemana = aula.diaSemana;
      result.numAlocados = aula.numAlocados;
      result.monitores = aula.monitores;
      result.soChefe = aula.soChefe;
    }
    return result;
  }
  
  getAulas() : Aula[] {
    return this.aulas;
  }
  

}
