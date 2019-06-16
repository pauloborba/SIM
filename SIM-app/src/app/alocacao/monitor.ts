export class Monitor {
    nome: string;
    disponibilidade: boolean[];
    restricoes: string[];
    alocacoes: number;
    chefe: boolean;

    constructor() {
        this.clean();
    }

    clean() : void {
        this.nome = "";
        this.disponibilidade = [false,false,false,false,false];
        this.restricoes = [];
        this.alocacoes = 0;
        this.chefe = false;
    }
}