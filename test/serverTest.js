var expect = require('chai').expect;
var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('server', function() {
  describe('/get', function() {
    it('should retrieve a list of stored reminders', function(done) {
      chai.request(server)
        .get('/notes/note0')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
