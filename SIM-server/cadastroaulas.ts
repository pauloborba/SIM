import { Aula } from '../SIM-app/src/app/alocacao/aula';

export class CadastroAulas {
  aulas: Aula[] = [];

  criar(aula: Aula): Aula {
    var result = null;

    if(this.dataNaoUsada(aula.data) && aula.data){
      result = new Aula();
      result.hora = aula.hora;
      result.tipo = aula.tipo;
      result.data = aula.data;
      result.diaSemana = aula.diaSemana;
      result.numAlocados = aula.numAlocados;
      result.monitores = aula.monitores;
      result.soChefe = aula.soChefe;
      this.aulas.push(result);
    }
   
     return result;
  }
  dataNaoUsada(data:string) : boolean{
    return !this.aulas.find(a => a.data == data);
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