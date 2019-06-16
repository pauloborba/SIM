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

      console.log(this.submissoes[0].aluno)
      console.log(this.submissoes[1].aluno)
      console.log(this.submissoes[2].aluno)
      
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
      getsubmissoesEnviadas(): Submissao[]{
        return [{
          ID: 2,
          nomeSub: "Submissão 2",
          aluno: "Maria",
          code: "Sonim bleine \n sinim clevers",
          nota: 4,
          clean: undefined,
          clone: undefined,
          copyFrom: undefined
        }]
      }
      getSubmissoes(): Submissao[] {
        return this.submissoes;
      }

}