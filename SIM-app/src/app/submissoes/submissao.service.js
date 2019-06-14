"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var SubmissaoService = /** @class */ (function () {
    function SubmissaoService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.simURL = 'http://localhost:3000';
    }
    SubmissaoService.prototype.deletar = function (aluno) {
        return this.http["delete"](this.simURL + "/deletarSubmissao", { headers: this.headers, body: JSON.stringify(aluno) })
            .toPromise()
            .then(function (res) {
            if (res.json().success) {
                return aluno;
            }
            else {
                return null;
            }
        })["catch"](this.tratarErro);
    };
    SubmissaoService.prototype.getSubmissoes = function () {
        return this.http.get(this.simURL + "/submissoes")
            .toPromise()
            .then(function (res) { return res.json(); })["catch"](this.tratarErro);
    };
    SubmissaoService.prototype.tratarErro = function (erro) {
        console.error('Acesso mal sucedido ao serviço de submissoes', erro);
        return Promise.reject(erro.message || erro);
    };
    SubmissaoService = __decorate([
        core_1.Injectable()
    ], SubmissaoService);
    return SubmissaoService;
}());
exports.SubmissaoService = SubmissaoService;
