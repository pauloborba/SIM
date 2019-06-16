export class Monitor{
    name: string
    sub:number
    status: string

    constructor() {
        this.clean();
      }

      clean(): void {
        this.name = "";
        this.sub = 0;
        this.status = "";
      }

      clone(): Monitor {
        var submissao: Monitor = new Monitor();
        submissao.copyFrom(this);
        return submissao;
      }
    
      copyFrom(from: Monitor): void {
        this.name = from.name;
        this.sub = from.sub;
        this.status = from.status;
      }
    
}