import Container from 'typedi';
import { FakeMonitorModel } from './FakeModels/FakeMonitorModel';
import { FakeMonitorsourceModel } from './FakeModels/FakeMonitorsourceModel';
import { FakeMonitorpageModel } from './FakeModels/FakeMonitorpageModel';
import { FakeProductModel } from './FakeModels/FakeProductModel';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { Auth } from '../src/auth';
import { MonitorService } from '../src/services/MonitorService';
import { QueueProvider } from '../src/provider/QueueProvider';

sinon.stub(QueueProvider, 'GetQueue').returns(null);

sinon.stub(Auth, 'CheckJWT').callsFake((req, res, next) => { 
  req['user'] = {name: 'user', sub: 'lsb|1234', permissions: ['read:monitor', 'create:monitor']};
  return next();
});

Container.set(MonitorService, new MonitorService(new FakeMonitorModel(), new FakeMonitorsourceModel(), new FakeMonitorpageModel(), new FakeProductModel()))

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
  describe("POST /monitor", () => {
    it("should return 200 and the created Monitor", (done) => {
      chai.request(app)
        .post('/monitor')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.monitor.id.should.be.an('string');
            res.body.monitor.botImage.should.be.an('string');
            res.body.monitor.botName.should.be.an('string');
            res.body.monitor.webHook.should.be.an('string');
            res.body.monitor.running.should.be.an('boolean');
            done();
        });
    });
    it("should return 200 and the created Monitor", (done) => {
      chai.request(app)
        .post('/monitor')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.monitor.id.should.be.an('string');
            res.body.monitor.botImage.should.be.an('string');
            res.body.monitor.botName.should.be.an('string');
            res.body.monitor.webHook.should.be.an('string');
            res.body.monitor.running.should.be.an('boolean');
            done();
        });
    });
    it("should return 200 and the created Monitor", (done) => {
      chai.request(app)
        .post('/monitor')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.monitor.id.should.be.an('string');
            res.body.monitor.botImage.should.be.an('string');
            res.body.monitor.botName.should.be.an('string');
            res.body.monitor.webHook.should.be.an('string');
            res.body.monitor.running.should.be.an('boolean');
            done();
        });
    });
    it("should return 400 - Already have 3 monitor", (done) => {
      chai.request(app)
        .post('/monitor')
        .end((err, res) => {
            res.should.have.status(400);
            res.body.message.should.be.equal('You already have 3 available Monitors for your account');
            done();
        });
    });
  });
});