import request = require("request-promise");
import 'jasmine';
import { closeServer } from '../sim-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../sim-server')});

  afterAll(() => {server.closeServer()});

  it("Atualização de monitor", () => {
    return request.post(base_url + "monitor", {"json":{"nome": "Ruy", "disponibilidade":[false,false,false,false,false], "restricoes":[], "alocacoes":"2", "chefe":"false"}}).then(body => {
         expect(body).toEqual({success: "O monitor foi cadastrado com sucesso"});
         return request.put(base_url + "monitor", {"json":{"nome": "Ruy", "disponibilidade":[false,false,false,false,false], "restricoes":[], "alocacoes":"1", "chefe":"false"}}).then(body => {
             expect(body).toEqual({success: "O monitor foi atualizado com sucesso"});
             return request.get(base_url + "monitores").then(body => {
                 expect(body).toContain('[{"nome":"Ruy","disponibilidade":[false,false,false,false,false],"restricoes":[],"alocacoes":"1","chefe":"false"}]');
                 expect(body).not.toContain('[{"nome":"Ruy","disponibilidade":[false,false,false,false,false],"restricoes":[],"alocacoes":"2","chefe":"false"}]');
             });
         });
     });
  });

})