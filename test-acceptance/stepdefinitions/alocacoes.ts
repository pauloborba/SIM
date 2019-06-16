import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, WebDriver } from 'protractor';
import { async } from 'q';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameName = ((elem, nome) => elem.element(by.name('nomelist')).getText().then(text => text === nome));
let sameDia = ((elem, nome) => elem.element(by.name('dia')).getText().then(text => text === nome));
let getSeg = ((elem) => elem.element(by.name('segunda-feira')).getText().then(text => text === "true"));
let getTer = ((elem) => elem.element(by.name('terca-feira')).getText().then(text => text === "true"));
let getQua = ((elem) => elem.element(by.name('quarta-feira')).getText().then(text => text === "true"));
let getQui = ((elem) => elem.element(by.name('quinta-feira')).getText().then(text => text === "true"));
let getSex = ((elem) => elem.element(by.name('sexta-feira')).getText().then(text => text === "true"));
let haveMon= ((elem, nome) => elem.all(by.name('nomelist')).filter(e => e.getText().then(text => text === nome)));
let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }){

    //Primeiro cenário
    Given(/^estou na página "([^\"]*)"$/, async(pagina)=> {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('SIMApp');
        await $("a[name='alocacao']").click();
        
    })
    Given(/^estou no menu de "([^\"]*)"$/, async (menu) => {
        await $("button[name='"+menu+"']").click();
    })
    Given(/^o monitor "([^\"]*)" está cadastrado no sistema e não está disponível para a "([^\"]*)"$/, async (nome, dia) => {
        
        var find_mon : ElementArrayFinder = element.all(by.name('monitoresList'));
        await find_mon
        
        if(dia == 'segunda-feira')
        await find_mon.filter( e=> pAND(sameName(e, nome),getSeg(e))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0))
        if(dia == 'terca-feira')
        await find_mon.filter( e=> pAND(sameName(e, nome),getTer(e))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0))
        if(dia == 'quarta-feira')
        await find_mon.filter( e=> pAND(sameName(e, nome),getQua(e))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0))
        if(dia == 'quinta-feira')
        await find_mon.filter( e=> pAND(sameName(e, nome),getQui(e))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0))
        if(dia == 'sexta-feira')
        await find_mon.filter( e=> pAND(sameName(e, nome),getSex(e))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0))
        
                      
    })
    Given(/^o monitor "([^\"]*)" não está alocado para a aula "([^\"]*)" dia "([^\"]*)"$/, async (nome, dia, data) => {
        await $("button[name='cronograma']").click();
        var allaulas : ElementArrayFinder = element.all(by.name('cronogramaTabela'));
        await allaulas;
        await allaulas.filter( e=> pAND(sameDia(e, data),haveMon(e,nome))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0))
      
    });
    When(/^eu tento alocar o monitor "([^\"]*)" na aula "([^\"]*)" dia "([^\"]*)"$/, async(nome, dia, data)=>{
        await $("button[name='alteracao']").click();
        await $("input[name='buscadia']").sendKeys(<string> data);
        await $("button[name='buscar']").click();
        await $("input[name='monitoresAlocados']").sendKeys(<string> nome);
        await $("button[name='confirmar']").click();
        
    });

    Then(/^recebo uma mensagem de erro$/, async()=>{
        await $("h5[name = 'mensagem']").getText().then(e=> e == 'voce nao pode alocar este monitor');
    });
    Then(/^sou direcionado para o menu de "([^\"]*)"$/, async(name)=>{
        await $("button[name='cronograma']").click();
    });
    
    //Segundo cenário
    Given(/^não vejo a aula "([^\"]*)" dia "([^\"]*)" na lista de "([^\"]*)"$/, async(data, dia, lista)=>{

        var allaulas : ElementArrayFinder = element.all(by.name('data'));
        await allaulas;
        var find_aula = allaulas.filter(element => element.getText().then(e => e === data))
        await find_aula;
        await find_aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });
    When(/^eu cadastro a aula "([^\"]*)" dia "([^\"]*)" hora "([^\"]*)" dia da semana "([^\"]*)" monitores "([^\"]*)"$/, async(tipo, data,hora, diaSemana, monitor)=>{
        await $("button[name='formulario']").click();
        await $("input[name='dataAula']").sendKeys(<string> data);
        await $("input[name='tipoAula']").sendKeys(<string> tipo);
        await $("input[name='horaAula']").sendKeys(<string> hora);
        await $("input[name='monitoresAula']").sendKeys(<string> monitor);
        await $("input[name='diaAula']").sendKeys(<string> diaSemana);

    });
    When(/^submeto ao sistema$/, async()=>{
        await $("button[name='adicionarAula']").click();
        
    });
    Then(/^vejo a aula "([^\"]*)" dia "([^\"]*)" com um marcador "([^\"]*)" escrito "([^\"]*)"$/,async(dia,data,marcador,tipo)=>{
        await $("button[name='cronograma']").click();
        var allaulas : ElementArrayFinder = element.all(by.name('data'));
        await allaulas;
        var find_aula = allaulas.filter(element => element.getText().then(e => e === data))
        await find_aula;
        await find_aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        
    });

    //Terceiro cenário

    Given(/^eu vejo a aula "([^\"]*)" dia "([^\"]*)" na lista de "([^\"]*)"$/, async(data, dia, lista)=>{
  
        var allaulas : ElementArrayFinder = element.all(by.name('data'));
        await allaulas;
        var find_aula = allaulas.filter(element => element.getText().then(e => e === dia))
        await find_aula;
        await find_aula.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
    When(/^eu seleciono a aula "([^\"]*)" dia "([^\"]*)"$/, async(dia, data)=>{
        await $("button[name='alteracao']").click();
        await $("input[name='buscadia']").sendKeys(<string> data);
        await $("button[name='buscar']").click();
    });

    When(/^marco a opção "([^\"]*)"$/, async(op)=>{
        await $("input[name='chefe']").click();
        await $("button[name='confirmar']").click();
    });
    
   
    
});


    

