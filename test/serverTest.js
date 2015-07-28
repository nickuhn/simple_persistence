var expect = require('chai').expect;
var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('server', function() {
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
      .put('/note/note2')
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
      .delete('/note/note3')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should retrieve a stored reminder', function(done) {
    chai.request('localhost:3000')
      .get('/note/note1')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  it('should overwrite a portion of a stored reminder', function(done) {
    chai.request('localhost:3000')
      .patch('/note/note2')
      .send({text: 'Sustained!'})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});
