import request = require("request-promise");
import 'jasmine';
//import { closeServer } from '../sim-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../sim-server')});

  afterAll(() => {server.closeServer()});


  it("consegue receber as submissões do the huxley", () => {
      return request.get(base_url + "submissoes").then(body => {
        expect(body).toContain('[{"ID":0,"nomeSub":"Submissão 5","aluno":"Matheus","code":"Int x = 2+7","code1":"System.out.println(x)","code2":"","code3":""},{"ID":1,"nomeSub":"Submissão 4","aluno":"Matheus","code":"while(i<3){","code1":"i++","code2":"System.out.println(x)","code3":"}"},{"ID":2,"nomeSub":"Submissão 5","aluno":"Erica","code":"if(x == true)","code1":"x=!x","code2":"}","code3":""}]');
      });
  })
  
  it("consegue deletar do sistema submissões já avaliadas", () => {
    return request.delete(base_url + "deletarSubmissao", {"json":{"ID":0,"nomeSub":"Submissão 5","aluno":"Matheus","code":""}}).then(body => {
      expect(body).not.toContain('{"ID":0,"nomeSub":"Submissão 5","aluno":"Matheus","code":""}');
    });
})

  it("não cadastra alunos sem login the huxley",()=>{
    return request.post(base_url + "aluno", {"json":{"nome": "Rodrigo", "login" : ""}}).then(body => {
      expect(body).toEqual({ failure: "O aluno não pode ser cadastrado"});
    });
  })


})
