import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


defineSupportCode(function ({ Given, When, Then }) {
    Given(/^estou na página de "([^\"]*)"$/, async (nome) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal(nome);
    })

    Given(/^o monitor "([^\"]*)" está disponível para "([^\"]*)"$/, async (nome, dia) => {
        await $("button[name='alocacao']").click();
        await $("button[name='formulario']").click();
        await $("input[name='nomeMonitor']").sendKeys(<string> nome);
        await $("input[name='disponibilidadeDias']").sendKeys(<string> dia);
        await $("button[name='adicionar']").click();
        
        await $("button[name='disponibilidade']").click();

        
        var monitores : ElementArrayFinder = element.all(by.repeater('let m of monitores'));
        await monitores;
        var monitor = monitores.filter(element => element.column('m.nome') === nome);
        await monitor;
        await monitor.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        if(dia == 'segunda-feira')
        await monitor.column('m.disponibilidade[0]').getText().then(e => e === "true");
        if(dia == 'terca-feira')
        await monitor.column('m.disponibilidade[1]').getText().then(e => e === "true");
        if(dia == 'quarta-feira')
        await monitor.column('m.disponibilidade[2]').getText().then(e => e === "true");
        if(dia == 'quinta-feira')
        await monitor.column('m.disponibilidade[3]').getText().then(e => e === "true");
        if(dia == 'sexta-feira')
        await monitor.column('m.disponibilidade[4]').getText().then(e => e === "true");
    })
    
    Given(/^o monitor "([^\"]*)" está alocado para a "([^\"]*)" dia "([^\"]*)"$/, async (nome, dia, data) => {
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === data && element.column('a.diaSemana') === dia);
        await aula;
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var findmonitor = aula.all(by.repeater('let m of a.monitores'));
        await findmonitor;
        var alocado = findmonitor.filter(element => expect(element.getText()).then(e => e === nome));
        await alocado.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^eu retiro a disponibilidade de "([^\"]*)" na "([^\"]*)"$/, async (nome, dia) => {
        await $("button[name='alteracao']").click();
        await $("input[name='nomeMonitor']").sendKeys(<string>nome);
        await $("button[name='buscarMonitor']").click();
        await expect($("table[name='tableMonitor']").isPresent()).toBeTruthy();
        await $("input[name='"+dia+"']").sendKeys("false");
        await $("button[name='confirmarMonitor']").click();
    })

    When(/^eu não vejo mais a disponibilidade de "([^\"]*)" na "([^\"]*)"$/, async (nome, dia) => {
        await $("button[name='disponibilidade']").click();
        var monitores : ElementArrayFinder = element.all(by.repeater('let m of monitores'));
        await monitores;
        var monitor = monitores.filter(element => element.column('m.nome') === nome);
        await monitor;
        await monitor.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        if(dia == 'segunda-feira')
        await monitor.column('m.disponibilidade[0]').getText().then(e => e === "false");
        if(dia == 'terca-feira')
        await monitor.column('m.disponibilidade[1]').getText().then(e => e === "false");
        if(dia == 'quarta-feira')
        await monitor.column('m.disponibilidade[2]').getText().then(e => e === "false");
        if(dia == 'quinta-feira')
        await monitor.column('m.disponibilidade[3]').getText().then(e => e === "false");
        if(dia == 'sexta-feira')
        await monitor.column('m.disponibilidade[4]').getText().then(e => e === "false");
    });

    Then(/^o monitor "([^\"]*)" não está mais alocado na "([^\"]*)" dia "([^\"]*)"$/, async (nome, dia, data) => {
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === data && element.column('a.diaSemana') === dia);
        await aula;
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var findmonitor = aula.all(by.repeater('let m of a.monitores'));
        await findmonitor;
        var alocado = findmonitor.filter(element => expect(element.getText()).then(e => e === nome));
        await alocado.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    })
})