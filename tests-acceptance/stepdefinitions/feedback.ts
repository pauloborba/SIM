import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let sameSubName = ((elem, sub) => elem.element(by.name('nomelist')).getText().then(text => text === sub));

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
    When(/^eu vou para a tela de “Submissões”$/, async () => {
        await $("a[name='submissoes']").click();
    });

    Then(/^eu consigo ver a "([^\"]*)" do aluno "([^\"]*)" no topo da lista.$/, async (sub, name) => {
            var allalunos : ElementArrayFinder = element.all(by.name('monitoreslist'));
            allalunos.filter(elem => pAND(sameSubName(elem,sub),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
})
