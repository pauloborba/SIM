"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var submissao_1 = require("./submissao");
var SubemissoesComponent = /** @class */ (function () {
    function SubemissoesComponent(submissaoService) {
        this.submissaoService = submissaoService;
        this.submissao = new submissao_1.Submissao();
    }
    SubemissoesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.submissaoService.getSubmissoes()
            .then(function (as) { return _this.submissoes = as; })["catch"](function (erro) { return alert(erro); });
    };
    SubemissoesComponent = __decorate([
        core_1.Component({
            selector: 'app-submissoes',
            templateUrl: './submissoes.component.html',
            styleUrls: ['./submissoes.component.css']
        })
    ], SubemissoesComponent);
    return SubemissoesComponent;
}());
exports.SubemissoesComponent = SubemissoesComponent;
