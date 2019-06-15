import 'jasmine';
import request = require("request-promise");
import { closeServer } from '../sim-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../sim-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de alunos vazia", () => {
    return request.get(base_url + "aulas").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
  })
  
  it("só cadastra aula", () => {
    var options:any = {method: 'POST', uri: (base_url + "aula"), body:{hora: "17:00", tipo: "acompanhamento", soChefe: false}, json: true};
    return request(options).then(body =>
         expect(body).toEqual({failure: "A aula não pode ser cadastrada"})
    ).catch(e =>
         expect(e).toEqual(null)
    )
  });



})