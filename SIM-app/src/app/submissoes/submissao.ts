export class Submissao{
    ID: number
    nomeSub: string
    aluno:string
    code: string

    constructor() {
        this.clean();
      }

      clean(): void {
        this.ID=-1;
        this.nomeSub = "";
        this.aluno = "";
        this.code = "";
      }

      clone(): Submissao {
        var submissao: Submissao = new Submissao();
        submissao.copyFrom(this);
        return submissao;
      }
    
      copyFrom(from: Submissao): void {
        this.ID = from.ID;
        this.nomeSub = from.nomeSub;
        this.aluno = from.aluno;
        this.code = from.code;
      }
    
}