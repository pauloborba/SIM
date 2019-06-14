import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Estou na página "([^\"]*)"$/, async (page) => {
        await browser.get("http://localhost:4200");
        await expect(browser.getTitle()).to.eventually.equal(<string> page)
    })
    Given(/^Estou no menu "([^\"]*)"$/, async (menu) => {
        await browser.get("http://localhost:4200/alocacao");
        await element(by.buttonText(<string> menu)).click();
    })

    Given(/^O monitor "([^\"]*)" está cadastrado e disponível para "([^\"]*)"$/, async (name,day) => {
        await element(by.buttonText('Formulario')).click();
        await $("input[name='nomeMonitor']").sendKeys(<string> name);
        await $("input[name='disponibilidadeDias']").sendKeys(<string> day);
        await element(by.buttonText('Adicionar')).click();

        var monitores : ElementArrayFinder = element.all(by.repeater('let m of monitores'));
        await monitores;
        var monitorSelec = monitores.filter(element => element.column('m.nome') === name);
        await monitorSelec;
        await monitorSelec.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        if(day == 'segunda-feira')
        await monitorSelec.column('m.disponibilidade[0]').getText().then(e => e === "true");
        if(day == 'terca-feira')
        await monitorSelec.column('m.disponibilidade[1]').getText().then(e => e === "true");
        if(day == 'quarta-feira')
        await monitorSelec.column('m.disponibilidade[2]').getText().then(e => e === "true");
        if(day == 'quinta-feira')
        await monitorSelec.column('m.disponibilidade[3]').getText().then(e => e === "true");
        if(day == 'sexta-feira')
        await monitorSelec.column('m.disponibilidade[4]').getText().then(e => e === "true");
    })
    Given(/^A quantidade mínima de monitores da aula "([^\"]*)" é "([^\"]*)"$/, async (day, number) => {
        await element(by.buttonText('Cronograma')).click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === day && element.column('a.monitoresNecessarios') === number);
        await aula;
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })
    
    Given(/^A aula "([^\"]*)" ainda não possui monitores$/, async (day) => {
        await element(by.buttonText('Cronograma')).click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === day);
        await aula;
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var monitorEncontrado = aula.all(by.repeater('let m of a.monitores'));
        await monitorEncontrado.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    When(/^Eu solicito a alocação de monitores$/, async () => {
        await element(by.buttonText('Cronograma')).click();
        await element(by.buttonText('Alocar Monitores')).click();
    })
    When(/^Eu edito os monitores de "([^\"]*)", adicionando o monitor "([^\"]*)"$/, async (day,name) => {
        await element(by.buttonText('Alteracao')).click();
        await $("input[name='buscadia']").sendKeys(<string> day);
        await element(by.buttonText('Buscar Aula')).click();
        await $("input[name='monitoresAlocados']").sendKeys(", "+<string>name);
        await element(by.buttonText('Confirmar')).click();
    })
    
    Then(/^O monitor "([^\"]*)" aparece alocado na aula "([^\"]*)"$/, async (name, day) => {
        await element(by.buttonText('Cronograma')).click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === day);
        await aula;
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var monitorEncontrado = aula.all(by.repeater('let m of a.monitores'));
        await monitorEncontrado;
        var monitorAlocado = monitorEncontrado.filter(element => expect(element.getText()).then(e => e === name));
        await monitorAlocado.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })
    Then(/^No menu "([^\"]*)" aparece uma mensagem de erro ao lado da aula "([^\"]*)"$/, async (name, day) => {
        await element(by.buttonText(<string> name)).click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === day);
        await aula;
        var monitoresMin: ElementArrayFinder = aula.all(by.name('monitoresNecessarios'));
        await monitoresMin;
        var minimo = monitoresMin.filter(element => element.length);
        await minimo;
        var numMonitoresAlocados: ElementArrayFinder =  aula.all(by.repeater('let m of a.monitores'));
        await numMonitoresAlocados;
        var atual = numMonitoresAlocados.filter(element => element.lentgth);
        if(minimo != atual){
            await expect($("td[name = 'mensagem']").getText().then(e=> e == 'Quantidade insuficiente de monitores'));
        }

    })
})