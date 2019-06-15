import { Aula } from '../SIM-app/src/app/alocacao/aula';

export class CadastroAulas {
  aulas: Aula[] = [];

  criar(aula: Aula): Aula {
    return new Aula();
  }

  atualizar(aula: Aula) : Aula {
    return new Aula();
  }
  
  getAulas() : Aula[] {
    return this.aulas;
  }
}