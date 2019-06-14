import { Submissao } from '../SIM-app/src/app/submissoes/submissao'; 

export class CadastroSubmissao {
    submissoes: Submissao[] = [];

    constructor(){
      var x: Submissao = new Submissao();
      var y: Submissao = new Submissao();
      var z: Submissao = new Submissao();
      
      x.ID=0;
      x.nomeSub="Submissão 5";
      x.aluno="Matheus";
      x.code ="";
      this.submissoes.push(x);

      y.ID=1;
      y.nomeSub="Submissão 4";
      y.aluno="Matheus";
      y.code="";
      this.submissoes.push(y);    
      
      z.ID=2;
      z.nomeSub="Submissão 5";
      z.aluno="Erica";
      z.code="";
      this.submissoes.push(z);

    
    }

    

      getSubmissoes(): Submissao[] {
        return this.submissoes;
      }

}