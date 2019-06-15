"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Submissao {
    constructor() {
        this.clean();
    }
    clean() {
        this.ID = -1;
        this.nomeSub = "";
        this.aluno = "";
        this.code = "";
    }
    clone() {
        var submissao = new Submissao();
        submissao.copyFrom(this);
        return submissao;
    }
    copyFrom(from) {
        this.ID = from.ID;
        this.nomeSub = from.nomeSub;
        this.aluno = from.aluno;
        this.code = from.code;
    }
}
exports.Submissao = Submissao;
//# sourceMappingURL=submissao.js.map