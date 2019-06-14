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
    };
    return Submissao;
}());
exports.Submissao = Submissao;
