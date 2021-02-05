import Container from 'typedi';
import { FakeMonitorModel } from './FakeModels/FakeMonitorModel';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { Auth } from '../src/auth';
import { MonitorService } from '../src/services/MonitorService';

sinon.stub(Auth, 'CheckJWT').callsFake((req, res, next) => { 
  req['user'] = {name: 'user', sub: 'lsb|1234', permissions: 'read:monitor'};
  return next();
});

Container.set(MonitorService, new MonitorService(new FakeMonitorModel(), null, null, null))

import { getApp } from '../src/app';

const app = getApp();

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Monitor", () => {
  describe("GET /monitor", () => {
    it("should return 200 and Array", (done) => {
      chai.request(app)
        .get('/monitor')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.monitors.should.be.an('array');
            done();
        });
    });
  });
});