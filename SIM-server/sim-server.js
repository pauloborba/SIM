"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var cadastroaulas_1 = require("./cadastroaulas");
var cadastromonitores_1 = require("./cadastromonitores");
var app = express();
exports.app = app;
var aulas = new cadastroaulas_1.CadastroAulas();
var monitores = new cadastromonitores_1.CadastroMonitores();
//var mailer : Mailer = new Mailer();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.get('/aulas', function (req, res) {
    res.send(JSON.stringify(aulas.getAulas()));
});
app.get('/monitores', function (req, res) {
    res.send(JSON.stringify(monitores.getMonitores()));
});
app.post('/aula', function (req, res) {
    var aula = req.body;
    aula = aulas.criar(aula);
    if (aula) {
        res.send({ "success": "A aula foi cadastrada com sucesso" });
    }
    else {
        res.send({ "failure": "A aula não pode ser cadastrada" });
    }
});
app.post('/monitor', function (req, res) {
    var monitor = req.body;
    monitor = monitores.criar(monitor);
    if (monitor) {
        res.send({ "success": "O monitor foi cadastrado com sucesso" });
    }
    else {
        res.send({ "failure": "O monitor não pode ser cadastrado" });
    }
});
app.put('/aula', function (req, res) {
    var aula = req.body;
    aula = aulas.atualizar(aula);
    if (aula) {
        res.send({ "success": "A aula foi atualizada com sucesso" });
    }
    else {
        res.send({ "failure": "A aula não pode ser atualizada" });
    }
});
app.put('/monitor', function (req, res) {
    var monitor = req.body;
    monitor = monitores.atualizar(monitor);
    if (monitor) {
        res.send({ "success": "O monitor foi atualizado com sucesso" });
    }
    else {
        res.send({ "failure": "O monitor não pode ser atualizado" });
    }
});
var server = app.listen(3000, function () { console.log('Example app listening on port 3000!'); });
exports.server = server;
function closeServer() {
    server.close();
}
exports.closeServer = closeServer;
