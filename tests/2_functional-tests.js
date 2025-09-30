const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '10L'})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.approximately(res.body.returnNum, 2.64172, 0.001);
            assert.equal(res.body.returnUnit, 'gal');
            assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
            done();
          });
      });
      
      test('Convert invalid unit 32g', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '32g'})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'invalid unit');
            done();
          });
      });
      
      test('Convert invalid number 3/7.2/4kg', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '3/7.2/4kg'})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'invalid number');
            done();
          });
      });
      
      test('Convert invalid number AND unit 3/7.2/4kilomegagram', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '3/7.2/4kilomegagram'})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'invalid number and unit');
            done();
          });
      });
      
      test('Convert with no number kg', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: 'kg'})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'kg');
            assert.approximately(res.body.returnNum, 2.20462, 0.001);
            assert.equal(res.body.returnUnit, 'lbs');
            assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
            done();
          });
      });
      
    });
    
    suite('GET /api/hello => welcome message', function() {
      
      test('Get welcome message', function(done) {
        chai.request(server)
          .get('/api/hello')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.message, 'Hello from Metric-Imperial Converter API!');
            done();
          });
      });
      
    });
    
    suite('GET / => index page', function() {
      
      test('Get index page', function(done) {
        chai.request(server)
          .get('/')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.include(res.text, 'Metric-Imperial Converter');
            done();
          });
      });
      
    });
    
    suite('GET /nonexistent => 404 page', function() {
      
      test('Get 404 page for nonexistent route', function(done) {
        chai.request(server)
          .get('/nonexistent')
          .end(function(err, res) {
            assert.equal(res.status, 404);
            assert.include(res.text, '404');
            done();
          });
      });
      
    });
    
  });
  
});