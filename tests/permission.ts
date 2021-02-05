// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { Auth } from '../src/auth';

sinon.stub(Auth, 'CheckJWT').callsFake((req, res, next) => next());

import { getApp } from '../src/app';

const app = getApp();

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Monitor", () => {
  describe("GET /monitor", () => {
    it("should return 403 - Insufficient scope", (done) => {
      chai.request(app)
        .get('/monitor')
        .end((err, res) => {
            res.should.have.status(403);
            res.body.message.should.be.equal('Insufficient scope');
            done();
        });
    });
  });
});