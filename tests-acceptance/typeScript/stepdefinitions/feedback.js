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
let sameName = ((elem, name) => elem.element(protractor_1.by.name('nomelist')).getText().then(text => text === name));
let sameSubName = ((elem, sub) => elem.element(protractor_1.by.name('subnomelist')).getText().then(text => text === sub));
let sameToSub = ((elem, num) => elem.element(protractor_1.by.name('sublist')).getText().then(text => text !== num));
let sameStatus = ((elem, status) => elem.element(protractor_1.by.name('statuslist')).getText().then(text => text === status));
let pAND = ((p, q) => p.then(a => q.then(b => a && b)));
let compareName = "";
let compareSubName = "";
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na tela de “Feedbacks”$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('SIMApp');
        yield protractor_1.$("a[name='feedback']").click();
    }));
    Given(/^O aluno "([^\"]*)" fez a "([^\"]*)" no The Huxley.$/, (name, sub) => __awaiter(this, void 0, void 0, function* () {
        compareName = name.toString();
        compareSubName = sub.toString();
    }));
    Given(/^A submissão "([^\"]*)" de "([^\"]*)" está aberta$/, (sub, name) => __awaiter(this, void 0, void 0, function* () {
        var allSubs = protractor_1.element.all(protractor_1.by.name('sublist'));
        var sameNameSub = allSubs.filter(elem => pAND(sameSubName(elem, sub), sameName(elem, name)));
        yield sameNameSub;
        yield sameNameSub.get(0).element(protractor_1.by.name('avaliar')).click();
    }));
    Given(/^Eu estou na página de “Submissões”$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('SIMApp');
        yield protractor_1.$("a[name='feedback']").click();
        yield protractor_1.$("a[name='submissoes']").click();
    }));
    Given(/^eu estou na página de cadastro de notas$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('SIMApp');
        yield protractor_1.$("a[name='alunos']").click;
    }));
    Given(/^o monitor "([^\"]*)" ainda não enviou seu feedback$/, (nome) => __awaiter(this, void 0, void 0, function* () {
        var allmonitores = protractor_1.element.all(protractor_1.by.name('monitoreslist'));
        yield allmonitores;
        yield allmonitores.filter(elem => pAND(sameToSub(elem, 0), sameName(elem, nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Given(/^posso ver que o monitor "([^\"]*)" esta marcado como "([^\"]*)"$/, (nome, status) => __awaiter(this, void 0, void 0, function* () {
        var allalunos = protractor_1.element.all(protractor_1.by.name('monitoreslist'));
        yield allalunos;
        yield allalunos.filter(elem => pAND(sameStatus(elem, status), sameName(elem, nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    When(/^o monitor "([^\"]*)" envia seus feedbacks$/, (nome) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='submissoes']").click();
        var allSubs = protractor_1.element.all(protractor_1.by.name('sublist'));
        yield allSubs;
        var x;
        yield protractor_1.element.all(protractor_1.by.name('sublist')).count().then(function (size) {
            x = size;
        });
        yield allSubs.get(0).element(protractor_1.by.name('avaliar')).click();
        yield protractor_1.element(protractor_1.by.buttonText('Avaliar')).click();
        yield allSubs.get(0).element(protractor_1.by.name('avaliar')).click();
        yield protractor_1.element(protractor_1.by.buttonText('Avaliar')).click();
    }));
    When(/^Eu atribuo a nota "(\d*)" ao feedback e realizo a submissão$/, (nota) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='nota']").sendKeys(nota);
        yield protractor_1.element(protractor_1.by.buttonText('Avaliar')).click();
    }));
    When(/^eu vou para a tela de “Submissões”$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='submissoes']").click();
    }));
    When(/^preencho o campo “nome do aluno” com "([^\"]*)"$/, (nome) => __awaiter(this, void 0, void 0, function* () {
        protractor_1.$("input[name='nomeAluno']").sendKeys(nome);
    }));
    When(/^o campo “logging” com "([^\"]*)"$/, (login) => __awaiter(this, void 0, void 0, function* () {
        protractor_1.$("input[name='loginAluno']").sendKeys(login);
    }));
    When(/^Eu adiciono o aluno$/, () => __awaiter(this, void 0, void 0, function* () {
        protractor_1.$("a[name='Adicionar']").click();
    }));
    Then(/^eu consigo ver a "([^\"]*)" do aluno "([^\"]*)" no topo da lista.$/, (sub, name) => __awaiter(this, void 0, void 0, function* () {
        var allalunos = protractor_1.element.all(protractor_1.by.name('monitoreslist'));
        allalunos.filter(elem => pAND(sameSubName(elem, sub), sameName(elem, name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Then(/^Eu Vejo a mensagem "([^\"]*)"$/, (message) => __awaiter(this, void 0, void 0, function* () {
        expect(protractor_1.element(protractor_1.by.name('message')).getText()).to.eventually.equal(message);
    }));
    Then(/^eu vejo uma mensagem de erro$/, () => __awaiter(this, void 0, void 0, function* () {
        expect(protractor_1.element(protractor_1.by.name('erro')).getText()).to.eventually.equal("Login invalido");
    }));
    Then(/^o aluno "([^\"]*)" não é cadastrado$/, (name) => __awaiter(this, void 0, void 0, function* () {
        var allalunos = protractor_1.element.all(protractor_1.by.name('alunos'));
        yield allalunos;
        yield allalunos.filter(elem => sameName(elem, name)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
    Then(/^posso ver o monitor "([^\"]*)" marcado como "([^\"]*)"$/, (name, status) => __awaiter(this, void 0, void 0, function* () {
        var allmonitores = protractor_1.element.all(protractor_1.by.name('monitoreslist'));
        yield allmonitores;
        yield allmonitores.filter(elem => pAND(sameStatus(elem, status), sameName(elem, name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    }));
});
