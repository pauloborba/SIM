"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));
let sameName = ((elem, nome) => elem.element(protractor_1.by.name('nomelist')).getText().then(text => text === nome));
let sameDia = ((elem, nome) => elem.element(protractor_1.by.name('dia')).getText().then(text => text === nome));
let getSeg = ((elem) => elem.element(protractor_1.by.name('segunda-feira')).getText().then(text => text === "true"));
let getTer = ((elem) => elem.element(protractor_1.by.name('terca-feira')).getText().then(text => text === "true"));
let getQua = ((elem) => elem.element(protractor_1.by.name('quarta-feira')).getText().then(text => text === "true"));
let getQui = ((elem) => elem.element(protractor_1.by.name('quinta-feira')).getText().then(text => text === "true"));
let getSex = ((elem) => elem.element(protractor_1.by.name('sexta-feira')).getText().then(text => text === "true"));
let haveMon = ((elem, nome) => elem.all(protractor_1.by.name('nomelist')).filter(e => e.getText().then(text => text === nome)));
let pAND = ((p, q) => p.then(a => q.then(b => a && b)));
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    //Primeiro cenário
    Given(/^estou na página "([^\"]*)"$/, (pagina) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('SIMApp');
        yield protractor_1.$("a[name='alocacao']").click();
    }));
    Given(/^estou no menu de "([^\"]*)"$/, (menu) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='" + menu + "']").click();
    }));
    Given(/^o monitor "([^\"]*)" está cadastrado no sistema e não está disponível para a "([^\"]*)"$/, (nome, dia) => __awaiter(this, void 0, void 0, function* () {
        var find_mon = protractor_1.element.all(protractor_1.by.name('monitoresList'));
        yield find_mon;
        if (dia == 'segunda-feira')
            yield find_mon.filter(e => pAND(sameName(e, nome), getSeg(e))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
        if (dia == 'terca-feira')
            yield find_mon.filter(e => pAND(sameName(e, nome), getTer(e))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
        if (dia == 'quarta-feira')
            yield find_mon.filter(e => pAND(sameName(e, nome), getQua(e))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
        if (dia == 'quinta-feira')
            yield find_mon.filter(e => pAND(sameName(e, nome), getQui(e))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
        if (dia == 'sexta-feira')
            yield find_mon.filter(e => pAND(sameName(e, nome), getSex(e))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    Given(/^o monitor "([^\"]*)" não está alocado para a aula "([^\"]*)" dia "([^\"]*)"$/, (nome, dia, data) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='cronograma']").click();
        var allaulas = protractor_1.element.all(protractor_1.by.name('cronogramaTabela'));
        yield allaulas;
        yield allaulas.filter(e => pAND(sameDia(e, data), haveMon(e, nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    When(/^eu tento alocar o monitor "([^\"]*)" na aula "([^\"]*)" dia "([^\"]*)"$/, (nome, dia, data) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='alteracao']").click();
        yield protractor_1.$("input[name='buscadia']").sendKeys(data);
        yield protractor_1.$("button[name='buscar']").click();
        yield protractor_1.$("input[name='monitoresAlocados']").sendKeys(nome);
        yield protractor_1.$("button[name='confirmar']").click();
    }));
    Then(/^recebo uma mensagem de erro$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("h5[name = 'mensagem']").getText().then(e => e == 'voce nao pode alocar este monitor');
    }));
    Then(/^sou direcionado para o menu de "([^\"]*)"$/, (name) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='cronograma']").click();
    }));
    //Segundo cenário
    Given(/^não vejo a aula "([^\"]*)" dia "([^\"]*)" na lista de "([^\"]*)"$/, (data, dia, lista) => __awaiter(this, void 0, void 0, function* () {
        var allaulas = protractor_1.element.all(protractor_1.by.name('data'));
        yield allaulas;
        var find_aula = allaulas.filter(element => element.getText().then(e => e === data));
        yield find_aula;
        yield find_aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    When(/^eu cadastro a aula "([^\"]*)" dia "([^\"]*)" hora "([^\"]*)" dia da semana "([^\"]*)" monitores "([^\"]*)"$/, (tipo, data, hora, diaSemana, monitor) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='formulario']").click();
        yield protractor_1.$("input[name='dataAula']").sendKeys(data);
        yield protractor_1.$("input[name='tipoAula']").sendKeys(tipo);
        yield protractor_1.$("input[name='horaAula']").sendKeys(hora);
        yield protractor_1.$("input[name='monitoresAula']").sendKeys(monitor);
        yield protractor_1.$("input[name='diaAula']").sendKeys(diaSemana);
    }));
    When(/^submeto ao sistema$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='adicionarAula']").click();
    }));
    Then(/^vejo a aula "([^\"]*)" dia "([^\"]*)" com um marcador "([^\"]*)" escrito "([^\"]*)"$/, (dia, data, marcador, tipo) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='cronograma']").click();
        var allaulas = protractor_1.element.all(protractor_1.by.name('data'));
        yield allaulas;
        var find_aula = allaulas.filter(element => element.getText().then(e => e === data));
        yield find_aula;
        yield find_aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    //Terceiro cenário
    Given(/^eu vejo a aula "([^\"]*)" dia "([^\"]*)" na lista de "([^\"]*)"$/, (data, dia, lista) => __awaiter(this, void 0, void 0, function* () {
        var allaulas = protractor_1.element.all(protractor_1.by.name('data'));
        yield allaulas;
        var find_aula = allaulas.filter(element => element.getText().then(e => e === dia));
        yield find_aula;
        yield find_aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    When(/^eu seleciono a aula "([^\"]*)" dia "([^\"]*)"$/, (dia, data) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("button[name='alteracao']").click();
        yield protractor_1.$("input[name='buscadia']").sendKeys(data);
        yield protractor_1.$("button[name='buscar']").click();
    }));
    When(/^marco a opção "([^\"]*)"$/, (op) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='chefe']").sendKeys("true");
        yield protractor_1.$("button[name='confirmar']").click();
    }));
});
