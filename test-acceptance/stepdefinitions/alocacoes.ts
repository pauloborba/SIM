import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { async } from 'q';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }){
    Given(/^estou na página "([^\"]*)"$/, async(pagina)=> {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='alocacao']").click();
    })
    Given(/^estou no menu de "([^\"]*)"$/, async (menu) => {
        await $("button[name='"+menu+"']").click();
    })
    Given(/^o monitor "([^\"]*)" está cadastrado no sistema e disponível para a "([^\"]*)"$/, async (nome, dia) => {
        
        var alldays_mon : ElementArrayFinder = element.all(by.repeater('let m of monitores'));
        await alldays_mon;
        var find_mon = alldays_mon.filter(element => element.column('m.nome') === nome) 
        await find_mon;
        await find_mon.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)); 
        if(dia = 'segunda-feira')
        await find_mon.column('m.disponibilidade[0]').getText().then(e => e === "true");
        if(dia = 'terca-feira')
        await find_mon.column('m.disponibilidade[1]').getText().then(e => e === "true");
        if(dia = 'quarta-feira')
        await find_mon.column('m.disponibilidade[2]').getText().then(e => e === "true");
        if(dia = 'quinta-feira')
        await find_mon.column('m.disponibilidade[3]').getText().then(e => e === "true");
        if(dia = 'sexta-feira')
        await find_mon.column('m.disponibilidade[4]').getText().then(e => e === "true");
        
                      
    })
    Given(/^o monitor "([^\"]*)" está alocado para a aula "([^\"]*)" dia "([^\"]*)"$/, async (nome, dia, data) => {
        await $("button[name='cronograma']").click();
        var allaulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await allaulas;
        var find_aula = allaulas.filter(element => element.column('a.data') === dia);
        await find_aula;
        await find_aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var find_mon = find_aula.all(by.repeater('let m of a.monitores'));
        await find_mon;
        await find_mon.filter(element => expect(element.getText().then(e => e === nome)));
      
    });
    When(/^eu tento alocar o monitor "([^\"]*)" na aula "([^\"]*)" dia "([^\"]*)"$/, async(nome, dia, data)=>{
        await $("button[name='alteracao']").click();
        await $("input[name='buscadia']").sendKeys(<string> dia);
        await $("button[name='buscar']").click();
        await $("input[name='monitoresAlocados']").sendKeys(<string> nome);
        await $("button[name='confirmar']").click();
        
    });

    Then(/^recebo uma mensagem de erro$/, async()=>{
        await expect($("td[name = 'mensagem']").getText().then(e=> e == 'voce nao pode alocar este monitor'));
    });
    Then(/^sou direcionado para o menu de "([^\"]*)"$/, async(name)=>{
        await $("button[name='cronograma']").click();
    });
});
