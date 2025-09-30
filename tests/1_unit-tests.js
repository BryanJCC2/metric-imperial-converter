const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      const input = '32L';
      const result = convertHandler.getNum(input);
      assert.equal(result, 32);
      done();
    });
    
    test('Decimal number input', function(done) {
      const input = '5.4gal';
      const result = convertHandler.getNum(input);
      assert.equal(result, 5.4);
      done();
    });
    
    test('Fractional input', function(done) {
      const input = '3/2mi';
      const result = convertHandler.getNum(input);
      assert.equal(result, 1.5);
      done();
    });
    
    test('Fractional input with decimal', function(done) {
      const input = '3.5/2lbs';
      const result = convertHandler.getNum(input);
      assert.equal(result, 1.75);
      done();
    });
    
    test('Double-fraction error', function(done) {
      const input = '3/2/3kg';
      const result = convertHandler.getNum(input);
      assert.equal(result, 'invalid number');
      done();
    });
    
    test('Default to 1 when no numerical input', function(done) {
      const input = 'gal';
      const result = convertHandler.getNum(input);
      assert.equal(result, 1);
      done();
    });
    
  });

  suite('Function convertHandler.getUnit(input)', function() {
    
    test('Valid unit gal', function(done) {
      const input = '10gal';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'gal');
      done();
    });
    
    test('Valid unit L', function(done) {
      const input = '10L';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'L');
      done();
    });
    
    test('Valid unit lbs', function(done) {
      const input = '10lbs';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'lbs');
      done();
    });
    
    test('Valid unit kg', function(done) {
      const input = '10kg';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'kg');
      done();
    });
    
    test('Valid unit mi', function(done) {
      const input = '10mi';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'mi');
      done();
    });
    
    test('Valid unit km', function(done) {
      const input = '10km';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'km');
      done();
    });
    
    test('Invalid unit', function(done) {
      const input = '10g';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'invalid unit');
      done();
    });
    
    test('Case insensitive unit', function(done) {
      const input = '10GAL';
      const result = convertHandler.getUnit(input);
      assert.equal(result, 'gal');
      done();
    });
    
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('Return unit for gal', function(done) {
      const input = 'gal';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'L');
      done();
    });
    
    test('Return unit for L', function(done) {
      const input = 'L';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'gal');
      done();
    });
    
    test('Return unit for lbs', function(done) {
      const input = 'lbs';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'kg');
      done();
    });
    
    test('Return unit for kg', function(done) {
      const input = 'kg';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'lbs');
      done();
    });
    
    test('Return unit for mi', function(done) {
      const input = 'mi';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'km');
      done();
    });
    
    test('Return unit for km', function(done) {
      const input = 'km';
      const result = convertHandler.getReturnUnit(input);
      assert.equal(result, 'mi');
      done();
    });
    
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('Spell out gal', function(done) {
      const input = 'gal';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'gallons');
      done();
    });
    
    test('Spell out L', function(done) {
      const input = 'L';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'liters');
      done();
    });
    
    test('Spell out lbs', function(done) {
      const input = 'lbs';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'pounds');
      done();
    });
    
    test('Spell out kg', function(done) {
      const input = 'kg';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'kilograms');
      done();
    });
    
    test('Spell out mi', function(done) {
      const input = 'mi';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'miles');
      done();
    });
    
    test('Spell out km', function(done) {
      const input = 'km';
      const result = convertHandler.spellOutUnit(input);
      assert.equal(result, 'kilometers');
      done();
    });
    
  });

  suite('Function convertHandler.convert(initNum, initUnit)', function() {
    
    test('Convert gal to L', function(done) {
      const initNum = 1;
      const initUnit = 'gal';
      const expected = 3.78541;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert L to gal', function(done) {
      const initNum = 1;
      const initUnit = 'L';
      const expected = 0.26417;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert mi to km', function(done) {
      const initNum = 1;
      const initUnit = 'mi';
      const expected = 1.60934;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert km to mi', function(done) {
      const initNum = 1;
      const initUnit = 'km';
      const expected = 0.62137;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert lbs to kg', function(done) {
      const initNum = 1;
      const initUnit = 'lbs';
      const expected = 0.45359;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
    test('Convert kg to lbs', function(done) {
      const initNum = 1;
      const initUnit = 'kg';
      const expected = 2.20462;
      const result = convertHandler.convert(initNum, initUnit);
      assert.approximately(result, expected, 0.001);
      done();
    });
    
  });

  suite('Function convertHandler.getString(initNum, initUnit, returnNum, returnUnit)', function() {
    
    test('Get correct string format', function(done) {
      const initNum = 10;
      const initUnit = 'gal';
      const returnNum = 37.8541;
      const returnUnit = 'L';
      const expected = '10 gallons converts to 37.8541 liters';
      const result = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      assert.equal(result, expected);
      done();
    });
    
  });

});