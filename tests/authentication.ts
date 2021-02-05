// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { getApp } from '../src/app';

const app = getApp();

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Monitor", () => {
  describe("GET /monitor", () => {
    it("should return 401 - No authorization token was found", (done) => {
      chai.request(app)
        .get('/monitor')
        .end((err, res) => {
            res.should.have.status(401);
            res.body.message.should.be.equal('No authorization token was found');
            done();
        });
    });
  });
});