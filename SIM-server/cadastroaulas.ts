import { Aula } from '../SIM-app/src/app/alocacao/aula';

export class CadastroAulas {
  aulas: Aula[] = [];

  criar(aula: Aula): Aula {
     this.aulas.push(aula);
     return aula;
  }

  atualizar(aula: Aula) : Aula {
    return new Aula();
  }
  
  getAulas() : Aula[] {
    return this.aulas;
  }
}