var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

app.get('/note/:id', function(req, res, next) {
  var options = {
    root: __dirname + '/data/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'Content-Type': 'text/json'
    }
  };
  res.sendFile(req.params.id + '.json', options, function(err)  {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Served: ', req.params.id);
      res.end();
    }
  });
});

app.post('/note', function(req, res, next) {
  var numFiles = 0;
  fs.readdir(__dirname + '/data/', function(err, files) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      numFiles = files.length;
      fs.writeFile(__dirname + '/data/note' + numFiles + '.json',
        JSON.stringify(req.body), function(err) {
          if (err) {
            res.status(err.status).end();
          } else {
            console.log('file saved: note' + numFiles);
            res.end();
          }
        });
    }
  });
});

app.put('/note/:id', function(req, res) {
  fs.writeFile(__dirname + '/data/' + req.params.id + '.json',
    JSON.stringify(req.body), function(err) {
    if (err) {
      res.status(err.status).end();
    } else {
      console.log('file overwritten: ' + req.params.id);
      res.end();
    }
  });
});

app.delete('/note/:id', function(req, res) {
  fs.unlink(__dirname + '/data/' + req.params.id + '.json', function(err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
  });
  console.log('Deleted:' + req.params.id);
});

app.listen(3000, function() {
  console.log('server running');
});
