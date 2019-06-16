import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { async } from 'q';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameSubName = ((elem, sub) => elem.element(by.name('esubnomelist')).getText().then(text => text === sub));
let sameName = ((elem, name) => elem.element(by.name('enomelist')).getText().then(text => text === name));
let sameNota = ((elem, name) => elem.element(by.name('enota')).getText().then(text => text === name));
let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }){
    // Quarto cenário 
    
    Given(/^já existe um feedback feito por mim para a aluna "([^\"]*)" na "([^\"]*)" com a nota "([^\"]*)"$/, async (nome,sub, nota) => {
      var allsubs : ElementArrayFinder = element.all(by.name('subenvlist'));
      await allsubs;
      await allsubs.filter( e=> pAND(sameName(e, nome),sameSubName(e,sub))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1))
     });  
     When(/^eu altero o feedback e mudo a nota para "([^\"]*)"$/,async(nota) => {
        await $("button[name='editar']").click();
        await $("input[name='nota']").sendKeys(<string> nota);
        await $("button[name='confirmar']").click();
     });
     Then(/^eu posso visualizar o novo feedback e nota "([^\"]*)" na "([^\"]*)" da aluna "([^\"]*)"$/, async(nota, sub, nome) => {
      var allsubs : ElementArrayFinder = element.all(by.name('subenvlist'));
      await allsubs;
      await allsubs.filter( e=> pAND(sameName(e, nome),sameSubName(e,sub))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1))
     });
})