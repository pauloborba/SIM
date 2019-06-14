import express = require('express');
import bodyParser = require("body-parser");

import fs = require('fs');
var app = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

export { app }