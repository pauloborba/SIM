"use strict";
exports.__esModule = true;
var Submissao = /** @class */ (function () {
    function Submissao() {
        this.clean();
    }
    Submissao.prototype.clean = function () {
        this.ID = -1;
        this.nomeSub = "";
        this.aluno = "";
        this.code = "";
        this.code1 = "";
        this.code2 = "";
        this.code3 = "";
    };
    Submissao.prototype.clone = function () {
        var submissao = new Submissao();
        submissao.copyFrom(this);
        return submissao;
    };
    Submissao.prototype.copyFrom = function (from) {
        this.ID = from.ID;
        this.nomeSub = from.nomeSub;
        this.aluno = from.aluno;
        this.code = from.code;
        this.code1 = from.code1;
        this.code2 = from.code2;
        this.code3 = from.code3;
    };
    return Submissao;
}());
exports.Submissao = Submissao;
