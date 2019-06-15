import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { async } from 'q';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameSubName = ((elem, sub) => elem.element(by.name('subnomelist')).getText().then(text => text === sub));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }){
    // Quarto cenário 
    Given(/^eu estou na página "([^\"]*)" de "([^\"]*)"$/, async (sub, nome) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='feedback']").click();
        await $("a[name='submissoes']").click();
        var allSubs : ElementArrayFinder = element.all(by.name('sublist'));
        var  sameNameSub = allSubs.filter(elem => pAND(sameSubName(elem,sub),sameName(elem,name)))
        await sameNameSub;
        await sameNameSub.get(0).element(by.name('avaliar')).click();
    });
    Given(/^já existe um feedback feito por mim com a nota "([^\"]*)" $/, async (nota) => {
        var n = document.getElementById('aNota').nodeValue;
        await expect(Promise.resolve(n)).to.eventually.equal(nota) ;
     });  
     When(/^eu altero o feedback e mudo a nota para "([^\"]*)"$/,async(nota) => {
        await $("input[name='nota']").sendKeys(<string> nota);
     });
     Then(/^eu posso visualizar o novo feedback e nota "([^\"]*)" na "([^\"]*)" do aluno "([^\"]*)"$/, async(nota, pag, nome) => {
        var n = document.getElementById('aNota').nodeValue;
        await expect(Promise.resolve(n)).to.eventually.equal(nota) ;
     });
})