import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameName = ((elem, name) => elem.element(by.name('nome')).getText().then(text => text === name));
let sameDay = ((elem, dia) => elem.element(by.name(dia)).getText().then(text => text === "true"));
let pAND = ((p,q) => p.then(a => q.then(b => a && b)))
let sameSome = ((elem, param, tagName) => elem.element(by.name(tagName)).getText().then(text => text === param));

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^estou na página "([^\"]*)"$/, async (nome) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal(nome);
    })

    Given(/^o monitor "([^\"]*)" está disponível para "([^\"]*)"$/, async (nome, dia) => {
        await $("a[name='alocacao']").click();
        await $("button[name='disponibilidade']").click();

        var monitores : ElementArrayFinder = element.all(by.name('monitoresList'));
        await monitores;
        var monitor = monitores.filter(elem => pAND(sameName(elem, nome), sameDay(elem,dia)));
        await monitor.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })
    
    Given(/^o monitor "([^\"]*)" está alocado para a "([^\"]*)" dia "([^\"]*)"$/, async (nome, dia, data) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.name('cronogramaTabela'));
        await aulas;
        var aula = aulas.filter(elem => pAND(sameSome(elem, data, 'data'), sameSome(elem, dia, 'dia')));
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var findmonitor = aula.all(by.name('monitoresAlocados'));
        await findmonitor;
        var alocado = findmonitor.filter(element => (element.getText()).then(e => e === nome));
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

        var monitores : ElementArrayFinder = element.all(by.name('monitoresList'));
        await monitores;
        var monitor = monitores.filter(elem => sameName(elem, nome));
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

    When(/^eu cadastro o monitor com o campo de disponibilidades com "([^\"]*)" o campo de nome "([^\"]*)", restrições de data "([^\"]*)", campo é chefe "([^\"]*)"$/, async (dia, nome, restricoes, chefe) => {
        await $("a[name='alocacao']").click();
        await $("button[name='formulario']").click();
        await $("input[name='nomeMonitor']").sendKeys(<string> nome);
        var disponibilidades : string[] = [];
        dia = dia.toString();
        if (dia != "") {
            if(dia.indexOf(" ") < 0) {
                disponibilidades.push(dia);
            } else {
                disponibilidades = dia.split(" ");
            }
        }
        for(var i = 0; i < disponibilidades.length; i++) {
            await $("input[name='" + disponibilidades[i] + "']").click();
        }
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
        await $("input[name='"+dia+"']").click();
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

        var monitores : ElementArrayFinder = element.all(by.name('monitoresList'));
        await monitores;
        var monitor = monitores.filter(elem => pAND(sameName(elem, nome), sameSome(elem,"false",dia)));
        await monitor.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^o monitor "([^\"]*)" não está mais alocado na "([^\"]*)" dia "([^\"]*)"$/, async (nome, dia, data) => {
        await $("a[name='alocacao']").click();
        await $("button[name='cronograma']").click();
        var aulas : ElementArrayFinder = element.all(by.name('cronogramaTabela'));
        await aulas;
        var aula = aulas.filter(elem => pAND(sameSome(elem, data, 'data'), sameSome(elem, dia, 'dia')));
        await aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        var findmonitor = aula.all(by.name('monitoresAlocados'));
        await findmonitor;
        var alocado = findmonitor.filter(element => (element.getText()).then(e => e === nome));
        await alocado.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
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

    Then(/^o monitor "([^\"]*)" está marcado como chefe$/, async (nome) => {
        await $("a[name='alocacao']").click();
        await $("button[name='disponibilidade']").click();

        var monitores : ElementArrayFinder = element.all(by.name('monitoresList'));
        await monitores;
        var monitor = monitores.filter(elem => pAND(sameName(elem, nome), sameSome(elem,"true", "chefe")));
        await monitor.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })

    Then(/^o monitor "([^\"]*)" nao está marcado como chefe$/, async (nome) => {
        await $("a[name='alocacao']").click();
        await $("button[name='disponibilidade']").click();

        var monitores : ElementArrayFinder = element.all(by.name('monitoresList'));
        await monitores;
        var monitor = monitores.filter(elem => pAND(sameName(elem, nome), sameSome(elem,"false", "chefe")));
        await monitor.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })
    
    Then(/^o monitor "([^\"]*)" possui o campo restrições igual a "([^\"]*)"$/, async (nome, restricoes) => {
        await $("a[name='alocacao']").click();
        await $("button[name='disponibilidade']").click();

        var monitores : ElementArrayFinder = element.all(by.name('monitoresList'));
        await monitores;
        var monitor = monitores.filter(elem => pAND(sameName(elem, nome), sameSome(elem, restricoes, "restricoes")));
        await monitor.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    })
})