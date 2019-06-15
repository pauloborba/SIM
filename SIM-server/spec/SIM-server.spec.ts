import 'jasmine';
import request = require("request-promise");
import { closeServer } from '../sim-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../sim-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de alunos vazia", () => {
    return request.get(base_url + "monitores").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
  })

  it("só cadastra monitor", () => {
    var options:any = {method: 'POST', uri: (base_url + "monitor"), body:{nome: "Daniel", chefe: false}, json: true};
    return request(options).then(body =>
         expect(body).toEqual({failure: "O monitor não pode ser cadastrado"})
    ).catch(e =>
         expect(e).toEqual(null)
    )
  });

  it("não cadastra monitor com nome duplicado", () => {
    return request.post(base_url + "monitor", {"json":{"nome": "Daniel", "disponibilidade":"[false,false,false,false,true]", "restricoes":"[]", "alocacoes":"0", "chefe":"false"}}).then(body => {
         expect(body).toEqual({success: "O monitor foi cadastrado com sucesso"});
         return request.post(base_url + "monitor", {"json":{"nome": "Daniel", "disponibilidade":"[true,false,true,false,true]", "restricoes":"[]", "alocacoes":"2", "chefe":"false"}}).then(body => {
             expect(body).toEqual({failure: "O monitor não pode ser cadastrado"});
             return request.get(base_url + "monitores").then(body => {
                 expect(body).toContain('{"nome": "Daniel", "disponibilidade":"[false,false,false,false,true]", "restricoes":"[]", "alocacoes":"0", "chefe":"false"}');
                 expect(body).not.toContain('{"nome": "Daniel", "disponibilidade":"[true,false,true,false,true]", "restricoes":"[]", "alocacoes":"2", "chefe":"false"}');
             });
         });
     });
  });

})