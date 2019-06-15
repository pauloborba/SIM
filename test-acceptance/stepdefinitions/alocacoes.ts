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
        await $("a[name='alocacao']").click();
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
        await $("a[name='alocacao']").click();
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

    Given(/^posso ver o valor "(\d*)" para monitores na aula do dia "([^\"]*)" do tipo "([^\"]*)"$/, async (numMonitores, data, tipo) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === data && element.column('a.tipo') === tipo && element.column('a.numAlocados') == numMonitores);
        await aula;
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
    
    Given(/^o monitor "([^\"]*)" não está disponível$/, async (nome) => {
        await $("a[name='alocacao']").click();
        await $("button[name='disponibilidade']").click();
        var monitores : ElementArrayFinder = element.all(by.repeater('let m of monitores'));
        await monitores;
        var monitor = monitores.filter(element => element.column('m.nome') === nome);
        await monitor;
        await monitor.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Given(/^posso ver o tipo "([^\"]*)" para a aula do dia "([^\"]*)"$/, async (tipo, data) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === data && element.column('a.tipo') === tipo);
        await aula;
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^posso ver o valor "(\d*)" para monitores na aula do dia "([^\"]*)"$/, async (numMonitores, data) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === data && element.column('a.numAlocados') === numMonitores);
        await aula;
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Given(/^o valor padrão para monitores nas aulas é "(\d*)"$/, async (numMonitores) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var padrao = element(by.name('padraoMonitores'));
        await expect(padrao.getText()).toBe(<string> numMonitores);
    });

    When(/^eu defino o valor "(\d*)" como padrão de monitores por aula$/, async (numMonitores) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        await $("input[name='monitoresAula']").sendKeys(<string> numMonitores);
        await $("button[name='definirPadrao']").click();
    })

    When(/^eu preencho o campo de disponibilidades com "([^\"]*)" o campo de nome "([^\"]*)", restrições de data "([^\"]*)", campo é chefe "([^\"]*)" e submeto ao sistema$/, async (dia, nome, restricoes, chefe) => {
        await $("a[name='alocacao']").click();
        await $("button[name='formulario']").click();
        await $("input[name='nomeMonitor']").sendKeys(<string> nome);
        await $("input[name='disponibilidadeDias']").sendKeys(<string> dia);
        await $("input[name='restricoes']").sendKeys(<string> restricoes);
        if (<string> chefe == "Sim") {
            await $("input[name='chefe']").click();
        }
        await $("button[name='adicionar']").click();
    })

    When(/^eu retiro a disponibilidade de "([^\"]*)" na "([^\"]*)"$/, async (nome, dia) => {
        await $("a[name='alocacao']").click();
        await $("button[name='alteracao']").click();
        await $("input[name='nomeMonitor']").sendKeys(<string>nome);
        await $("button[name='buscarMonitor']").click();
        await expect($("table[name='tableMonitor']").isPresent()).toBeTruthy();
        await $("input[name='"+dia+"']").sendKeys("false");
        await $("button[name='confirmarMonitor']").click();
    })

    When(/^eu altero o campo tipo para "([^\"]*)" da aula do dia "([^\"]*)"$/, async (tipo, data) => {
        await $("a[name='alocacao']").click();
        await $("button[name='alteracao']").click();
        await $("input[name='buscadia']").sendKeys(<string>data);
        await $("button[name='buscar']").click();
        await $("input[name='tipo']").sendKeys(<string> tipo);
        await $("button[name='confirmar']").click();
    })

    When(/^eu não vejo mais a disponibilidade de "([^\"]*)" na "([^\"]*)"$/, async (nome, dia) => {
        await $("a[name='alocacao']").click();
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
        await $("a[name='alocacao']").click();
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

    Then(/^o monitor "([^\"]*)" está disponível para "([^\"]*)"$/, async (nome, dia) => {
        await $("a[name='alocacao']").click();
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

    Then(/^eu vejo a aula do dia "([^\"]*)" com o valor "([^\"]*)" para monitores$/, async (data, numMonitores) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === data && element.column('a.numAlocados') === numMonitores);
        await aula;
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })

    Then(/^eu vejo a aula do dia "([^\"]*)" com o tipo "([^\"]*)"$/, async (data, tipo) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.repeater('let a of aulas'));
        await aulas;
        var aula = aulas.filter(element => element.column('a.data') === data && element.column('a.tipo') === tipo);
        await aula;
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })
})