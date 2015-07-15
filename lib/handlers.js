var fs = require('fs');

module.exports = {

  get: function(req, res) {
    var options = {
      root: __dirname + '/../data/',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'Content-Type': 'application/json'
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
  },

  post: function(req, res) {
    var numFiles = 0;
    fs.readdir(__dirname + '/../data/', function(err, files) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        numFiles = files.length;
        files.forEach(function(file) {
          while (file === 'note' + numFiles + '.json') {
            numFiles ++;
          }
        });
        fs.writeFile(__dirname + '/../data/note' + numFiles + '.json',
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
  },

  put: function(req, res) {
    fs.writeFile(__dirname + '/../data/' + req.params.id + '.json',
      JSON.stringify(req.body), function(err) {
      if (err) {
        res.status(err.status).end();
      } else {
        console.log('file completely overwritten: ' + req.params.id);
        res.end();
      }
    });
  },

  del: function(req, res) {
    fs.unlink(__dirname + '/../data/' + req.params.id + '.json', function(err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
    console.log('Deleted:' + req.params.id);
    res.end();
  },

  patch: function(req, res) {
    fs.readFile(__dirname + '/../data/' + req.params.id + '.json', function(err, data) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        var existingFile = JSON.parse(data);
        var updateFile = req.body
        for(var prop in updateFile) {
          for (var key in existingFile) {
            if (prop === key) {
              existingFile[key] = updateFile[prop];
            }
          }
        }
        fs.writeFile(__dirname + '/../data/' + req.params.id + '.json', JSON.stringify(existingFile), function(err) {
          if (err) {
            res.status(err.status).end();
          } else {
            console.log('file partially overwritten: ' + req.params.id);
            res.end();
          }
        });
      }
    });

  }


};
