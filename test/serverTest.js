var expect = require('chai').expect;
var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var fs = require('fs');

chai.use(chaiHttp);

describe('server', function() {
  before(function(done) {
    fs.writeFile(__dirname + '/../data/test.json',
      {content: "testing text."}, function(err) {
      if (err) {
        console.log(err);
      }
      done();
    });
  });
  it('should store a reminder', function(done) {
    chai.request('localhost:3000')
      .post('/note')
      .send({author: 'testing', text: 'tests some more'})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should overwrite a stored reminder', function(done) {
    chai.request('localhost:3000')
      .put('/note/test')
      .send({author: 'Judge', text: 'Overruled!'})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should delete a stored reminder', function(done) {
    before(function() {
      chai.request('localhost:3000').post('/note');
    });
    chai.request('localhost:3000')
      .delete('/note/note2')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should retrieve a stored reminder', function(done) {
    chai.request('localhost:3000')
      .get('/note/test')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('should overwrite a portion of a stored reminder', function(done) {
    chai.request('localhost:3000')
      .patch('/note/test')
      .send({text: 'Sustained!'})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  after(function(done) {
    fs.unlink(__dirname + '/../data/test.json', function(err) {
      if (err) {
        console.log(err);
      }
      done();
    });
  });
});
