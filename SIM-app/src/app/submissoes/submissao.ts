export class Submissao{
    ID: number
    nomeSub: string
    aluno:string
    code: string
    code1: string
    code2:string
    code3:string

    constructor() {
        this.clean();
      }

      clean(): void {
        this.ID=-1;
        this.nomeSub = "";
        this.aluno = "";
        this.code = "";
        this.code1 = "";
        this.code2 = "";
        this.code3 = "";
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
        this.code1 = from.code1;
        this.code2 = from.code2;
        this.code3 = from.code3;
      }
    
}