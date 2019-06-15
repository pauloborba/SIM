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
        expect(body).toContain('[{"ID":0,"nomeSub":"Submissão 5","aluno":"Matheus","code":""},{"ID":1,"nomeSub":"Submissão 4","aluno":"Matheus","code":""},{"ID":2,"nomeSub":"Submissão 5","aluno":"Erica","code":""}]');
      });
  })


})
