var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var handlers = require('./lib/handlers');

var app = express();

app.use(bodyParser.json());

app.get('/note/:id', function(req, res) {
  handlers.get(req, res);
});

app.post('/note', function(req, res) {
  handlers.post(req, res);
});

app.put('/note/:id', function(req, res) {
  handlers.put(req, res);
});

app.delete('/note/:id', function(req, res) {
  handlers.del(req, res);
});

app.listen(3000, function() {
  console.log('server running');
});
