var fs = require('fs');

module.exports = {

  get: function(req, res) {
    var options = {
      root: __dirname + '/../data/',
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
        return res;
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
        })
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
        console.log('file overwritten: ' + req.params.id);
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
  }


};
