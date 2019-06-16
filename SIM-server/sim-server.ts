import express = require('express');
import bodyParser = require("body-parser");


import {CadastroCriterios} from './cadastroCriterios';
import { CadastroSubmissao } from './cadastroSub';

import {CadastroAulas} from './cadastroaulas';
import {CadastroMonitores} from './cadastromonitores';
import {Monitor} from '../SIM-app/src/app/alocacao/monitor';
import {Aula} from '../SIM-app/src/app/alocacao/aula';

import fs = require('fs');
var app = express();

var cadastroCriterios: CadastroCriterios = new CadastroCriterios();
var cadastroSub: CadastroSubmissao = new CadastroSubmissao();

var aulas: CadastroAulas = new CadastroAulas();
var monitores: CadastroMonitores = new CadastroMonitores();
//var mailer : Mailer = new Mailer();
var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/aulas', function(req, res){
  res.send(JSON.stringify(aulas.getAulas()));
})
app.get('/monitores', function(req, res){
  res.send(JSON.stringify(monitores.getMonitores()));
})

app.get('/criterio', function (req, res) {
  res.send(cadastroCriterios.getCriterios());
})
app.get('/submissoes', function (req, res) {
  res.send(cadastroSub.getSubmissoes());
})
app.get('/submissoesEnviadas',  function (req, res){
  res.send(cadastroSub.getsubmissoesEnviadas());
})


app.post('/aula', function(req: express.Request, res: express.Response){
  var aula: Aula = <Aula> req.body;
  aula = aulas.criar(aula);
  if (aula) {
    res.send({"success": "A aula foi cadastrada com sucesso"});
  } else {
    res.send({"failure": "A aula não pode ser cadastrada"});
  }
})

app.post('/monitor', function(req: express.Request, res: express.Response){
  var monitor: Monitor = <Monitor> req.body;
  monitor = monitores.criar(monitor);
  if (monitor) {
    res.send({"success": "O monitor foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O monitor não pode ser cadastrado"});
  }
})

app.post('/criterio', function (req: express.Request, res: express.Response) {
  var criterio: string = req.body.criterio;
  criterio = cadastroCriterios.criar(criterio);
  if (criterio) {
    res.send({"success": "O criterio foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O criterio não pode ser cadastrado"});
  }
})

app.delete('/deletarSubmissao', function (req: express.Request, res: express.Response){
  var submissao = req.body;
  var removido = cadastroSub.deletar(submissao);
  if (removido) {
    res.send({"success": "A submissão foi removida com sucesso"});
  } else {
    res.send({"failure": "A submissão foi não pôde ser removida"});
  }
})

app.put('/aula', function (req: express.Request, res: express.Response) {
  var aula: Aula = <Aula> req.body;
  aula = aulas.atualizar(aula);
  if (aula) {
    res.send({"success": "A aula foi atualizada com sucesso"});
  } else {
    res.send({"failure": "A aula não pode ser atualizada"});
  }
})

app.put('/monitor', function (req: express.Request, res: express.Response) {
  var monitor: Monitor = <Monitor> req.body;
  monitor = monitores.atualizar(monitor);
  if (monitor) {
    res.send({"success": "O monitor foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O monitor não pode ser atualizado"});
  }
})

var server = app.listen(3000, function () { console.log('Example app listening on port 3000!') }) 

function closeServer(): void { 
  server.close(); 
} 

export { app, server, closeServer } 