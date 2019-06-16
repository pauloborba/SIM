import 'jasmine';
import request = require("request-promise");
import { closeServer } from '../sim-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../sim-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de aulas vazia", () => {
    return request.get(base_url + "aulas").then(body => expect(body).toBe("[]")).catch(e => expect(e).toEqual(null));
  })
  
  it("só cadastra aula", () => {
    var options:any = {method: 'POST', uri: (base_url + "aula"), body:{hora: "17:00", tipo: "acompanhamento", soChefe: false, data:''}, json: true};
    return request(options).then(body =>
         expect(body).toEqual({failure: "A aula não pode ser cadastrada"})
    ).catch(e =>
         expect(e).toEqual(null)
    )
  });


  it("não cadastra aula no mesmo dia", () => {
    return request.post(base_url + "aula", {"json":{"hora": "17:00", "tipo": "acompanhamento", "data": "12/07", "diaSemana": "segunda-feira", "alocacoes": 2, "monitores": {"nome":"Daniel","disponibilidade":[true,true,false,false,false],"restricoes":[],"chefe":false}, "soChefe":  "false"}}).then(body => {
         expect(body).toEqual({success: "A aula foi cadastrada com sucesso"});
         return request.post(base_url + "aula", {"json":{"hora": "17:00", "tipo": "acompanhamento", "data": "12/07", "diaSemana": "segunda-feira", "numALocados": "32", "monitores": "['Berg', 'Arthur']", "soChefe":  "true"}}).then(body => {
             expect(body).toEqual({failure: "A aula não pode ser cadastrada"});
             return request.get(base_url + "aulas").then(body => {
                 expect(body).toContain('{"hora":"17:00","tipo":"acompanhamento","data":"12/07","diaSemana":"segunda-feira","monitores":{"nome":"Daniel","disponibilidade":[true,true,false,false,false],"restricoes":[],"chefe":false},"soChefe":"false"}');
                 expect(body).not.toContain('{"hora": "17:00", "tipo": "acompanhamento", "data": "12/07", "diaSemana": "segunda-feira", "numALocados": "32", "monitores": "["Berg", "Arthur"]", "soChefe":  "true"}');
             });
         });
     });
  });

})