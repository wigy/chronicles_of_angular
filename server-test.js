#!/usr/bin/env node
var express = require('express');
//var angularcontext = require('angularcontext');
var d = require('./src/globals.js');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  d('Example app listening on port 3000!');
});