import { Submissao } from '../SIM-app/src/app/submissoes/submissao'; 
//import data from './data.json'

//Não consegui realizar a refatoração do código
//uma vez que o compilador de typescript não pode reconhecer import json
export class CadastroSubmissao {
  submissoes: Submissao[] = [];

  // esse constructor é um stub representando as questões puxadas do the
  constructor(){
    var x: Submissao = new Submissao();
    var y: Submissao = new Submissao();
    var z: Submissao = new Submissao();
    
    x.ID=0;
    x.nomeSub="Submissão 5";
    x.aluno="Matheus";
    x.code ="Int x = 2+7";
    x.code1 = "System.out.println(x)";
    this.submissoes.push(x);

    y.ID=1;
    y.nomeSub="Submissão 4";
    y.aluno="Matheus";
    y.code="while(i<3){";
    y.code1="i++";
    y.code2="System.out.println(x)";
    y.code3="}";
    this.submissoes.push(y);    
    
    z.ID=2;
    z.nomeSub="Submissão 5";
    z.aluno="Erica";
    z.code="if(x == true)";
    z.code1="x=!x";
    z.code2="}";
    this.submissoes.push(z);

  }

  criar(submissao: Submissao): Submissao {
    var result = null;
      result = submissao;
      this.submissoes.push(result);
    return result;
  }

  deletar(submissao: Submissao): boolean {
      var result: Submissao = this.submissoes.find(a => a.nomeSub == submissao.nomeSub);
      var saida: boolean = false;
      if (result){
        this.submissoes.splice(this.submissoes.indexOf(result), 1);
        saida = true;
      } 
      return saida;
    }

    getSubmissoes(): Submissao[] {
      return this.submissoes;
    }


}