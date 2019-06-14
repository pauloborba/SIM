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
let sameCPF = ((elem, cpf) => elem.element(protractor_1.by.name('cpflist')).getText().then(text => text === cpf));
let sameName = ((elem, name) => elem.element(protractor_1.by.name('nomelist')).getText().then(text => text === name));
let pAND = ((p, q) => p.then(a => q.then(b => a && b)));
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^estou na página "([^\"]*)"$/, (pagina) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('SIMApp');
    }));
    Given(/^estou no menu de "([^\"]*)"$/, (menu) => __awaiter(this, void 0, void 0, function* () {
        //await $("a[name='"+menu+"']").click();
    }));
    Given(/^o monitor "([^\"]*)" está cadastrado no sistema e disponível para a "([^\"]*)"$/, (nome, dia) => __awaiter(this, void 0, void 0, function* () {
        /*var allcpfs : ElementArrayFinder = element.all(by.name('datalist'));
        await allcpfs;
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs;
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));*/
    }));
    Given(/^o monitor "([^\"]*)" está alocado para a aula "([^\"]*)" dia "([^\"]*)"$/, (nome, dia, data) => __awaiter(this, void 0, void 0, function* () {
        /*var datas : ElementArrayFinder = element.all(by.name('dataList'));
        await datas;
        var mesmodia = datas.filter(elem =>
                                      elem.getText().then(day => day === data));
        await mesmodia;
        await mesmodia.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));*/
    }));
    When(/^eu tento alocar o monitor "([^\"]*)" na aula "([^\"]*)" dia "([^\"]*)"$/, (nome, dia, data) => __awaiter(this, void 0, void 0, function* () {
    }));
    Then(/^recebo uma mensagem de erro$/, () => __awaiter(this, void 0, void 0, function* () {
    }));
    Then(/^sou direcionado para o menu de "([^\"]*)"$/, (name) => __awaiter(this, void 0, void 0, function* () {
    }));
});
/*defineSupportCode(function ({ Given, When, Then }) {
    Given(/^estou na página de Alocações$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
    })

    Given(/^estou no menu de Disponibilidade de Dias$/, async () => {
        await $("a[name='dispDias']").click();
    })

    Given(/^estou no menu de Cronograma$/, async () => {
        await $("a[name='cronograma']").click();
    })

    Given(/^o monitor "([^\"]*)" está disponível para "([^\"]*)"$/, async (nome, dia) => {
        var allcpfs : ElementArrayFinder = element.all(by.name('datalist'));
        await allcpfs;
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs;
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    })
    
    Given(/^o monitor "([^\"]*)" está alocado para a "([^\"]*)" dia "([^\"]*)"$/, async (nome, dia, data) => {
        var datas : ElementArrayFinder = element.all(by.name('dataList'));
        await datas;
        var mesmodia = datas.filter(elem =>
                                      elem.getText().then(day => day === data));
        await mesmodia;
        await mesmodia.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^eu retiro a disponibilidade de "([^\"]*)" na "([^\"]*)"$/, async (nome, dia) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        var samenamecpf = allalunos.filter(elem => sameCPF(elem,cpf) && sameName(elem, name));
        await samenamecpf;
        await samenamecpf.get(0).element(by.name('remover')).click();
    })

    When(/^submeto para o sistema$/, async (name, cpf, github) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await $("input[name='gitbox']").sendKeys(<string> github);
        await element(by.buttonText('Adicionar')).click();
    })

    When(/^eu não vejo mais a disponibilidade de "([^\"]*)" na "([^\"]*)"$/, async (name, cpf) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await element(by.buttonText('Adicionar')).click();
    });

    Then(/^o monitor "([^\"]*)" não está mais alocado na "([^\"]*)" dia "([^\"]*)"$/, async (name, cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })
    
    Then(/^o monitor "([^\"]*)" passa a estar alocado na "([^\"]*)" dia "([^\"]*)"$/, async (name, cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });
})*/ 
