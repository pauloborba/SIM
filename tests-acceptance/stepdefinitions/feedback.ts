import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';


let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let sameSubName = ((elem, sub) => elem.element(by.name('subnomelist')).getText().then(text => text === sub));
let sameToSub = ((elem, num) => elem.element(by.name('sublist')).getText().then(text => text !== num));
let sameStatus = ((elem, status) => elem.element(by.name('statuslist')).getText().then(text => text === status));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

let compareName = "";
let compareSubName = "";

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na tela de “Feedbacks”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='feedback']").click();
    })
    Given(/^O aluno "([^\"]*)" fez a "([^\"]*)" no The Huxley.$/, async (name,sub) => {
        compareName = name.toString();
        compareSubName = sub.toString();
    });
    Given(/^A submissão "([^\"]*)" de "([^\"]*)" está aberta$/, async (sub,name) => {
        var allSubs : ElementArrayFinder = element.all(by.name('sublist'));
        var  sameNameSub = allSubs.filter(elem => pAND(sameSubName(elem,sub),sameName(elem,name)))
        await sameNameSub;
        await sameNameSub.get(0).element(by.name('avaliar')).click();
    });
    Given(/^Eu estou na página de “Submissões”$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='feedback']").click();
        await $("a[name='submissoes']").click();
    });
    Given(/^eu estou na página de cadastro de notas$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='alunos']").click();
    });

    Given(/^o monitor "([^\"]*)" ainda não enviou seu feedback$/, async (nome) => {
        var allmonitores : ElementArrayFinder = element.all(by.name('monitoreslist'));
        await allmonitores;
        await allmonitores.filter(elem => pAND(sameToSub(elem,0),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });


    Given(/^posso ver que o monitor "([^\"]*)" esta marcado como "([^\"]*)"$/, async (nome,status) => {
        var allalunos : ElementArrayFinder = element.all(by.name('monitoreslist'));
        await allalunos; 
        await allalunos.filter(elem => pAND(sameStatus(elem,status),sameName(elem,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^o monitor "([^\"]*)" envia seus feedbacks$/, async (nome) => {
        await $("a[name='submissoes']").click();
        var allSubs : ElementArrayFinder = element.all(by.name('sublist'));
        await allSubs;
        
        var x;
        await element.all(by.name('sublist')).count().then(
            function(size){
                x = size;
            }
        );  
           
        await allSubs.get(0).element(by.name('avaliar')).click()
        await element(by.buttonText('Avaliar')).click();

        await allSubs.get(0).element(by.name('avaliar')).click()
        await element(by.buttonText('Avaliar')).click();
        
    });

    When(/^Eu atribuo a nota "(\d*)" ao feedback e realizo a submissão$/, async (nota) => {
        await $("input[name='nota']").sendKeys(<string> nota);
        await element(by.buttonText('Avaliar')).click();
    });

    When(/^eu vou para a tela de “Submissões”$/, async () => {
        await $("a[name='submissoes']").click();
    });

    When(/^preencho o campo “nome do aluno” com "([^\"]*)"$/, async (nome) => {
       await $("input[name='nomeAluno']").sendKeys(<string> nome);
    });

     When(/^o campo “logging” com "([^\"]*)"$/, async (login) => {
       await $("input[name='loginAluno']").sendKeys(<string> login);
    });
    When(/^Eu adiciono o aluno$/, async () => {
       await element(by.buttonText('Adicionar')).click();
    });

    Then(/^eu consigo ver a "([^\"]*)" do aluno "([^\"]*)" no topo da lista.$/, async (sub, name) => {
        var allalunos : ElementArrayFinder = element.all(by.name('sublist'));
        await allalunos.filter(elem => pAND(sameSubName(elem,sub),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^Eu Vejo a mensagem "([^\"]*)"$/, async (message) => {
         expect(element(by.name('message')).getText()).to.eventually.equal(message);
    });

    Then(/^eu vejo uma mensagem de erro$/, async () => {
        await expect(element(by.name('erro')).getText()).to.eventually.equal("Login invalido");
    });

   Then(/^posso ver o monitor "([^\"]*)" marcado como "([^\"]*)"$/, async (name,status) => {
    var allmonitores : ElementArrayFinder = element.all(by.name('monitoreslist'));
    await allmonitores;
    await allmonitores.filter(elem => pAND(sameStatus(elem,status),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
   });
})

