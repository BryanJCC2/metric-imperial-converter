class ConvertHandler {
  
  getNum(input) {
    if (!input || typeof input !== 'string') {
      return 'invalid number';
    }

    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) {
      return 'invalid number';
    }

    const numPart = input.substring(0, unitMatch.index);
    
    if (numPart === '') {
      return 1;
    }

    if (numPart.includes('/')) {
      const fractions = numPart.split('/');
      if (fractions.length !== 2) {
        return 'invalid number';
      }
      
      const numerator = parseFloat(fractions[0]);
      const denominator = parseFloat(fractions[1]);
      
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }
      
      return numerator / denominator;
    }

    const num = parseFloat(numPart);
    if (isNaN(num)) {
      return 'invalid number';
    }

    return num;
  }

  getUnit(input) {
    if (!input || typeof input !== 'string') {
      return 'invalid unit';
    }

    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) {
      return 'invalid unit';
    }

    const unit = unitMatch[0].toLowerCase();
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    
    if (!validUnits.includes(unit)) {
      return 'invalid unit';
    }

    return unit === 'l' ? 'L' : unit;
  }

  getReturnUnit(initUnit) {
    if (!initUnit || initUnit === 'invalid unit') {
      return 'invalid unit';
    }

    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };

    return unitMap[initUnit] || 'invalid unit';
  }

  spellOutUnit(unit) {
    const unitSpellings = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };

    return unitSpellings[unit] || 'invalid unit';
  }

  convert(initNum, initUnit) {
    if (initNum === 'invalid number' || initUnit === 'invalid unit') {
      return null;
    }

    const conversionRates = {
      'gal': 3.78541,
      'L': 1/3.78541,
      'lbs': 0.453592,
      'kg': 1/0.453592,
      'mi': 1.60934,
      'km': 1/1.60934
    };

    const rate = conversionRates[initUnit];
    if (!rate) {
      return null;
    }

    return parseFloat((initNum * rate).toFixed(5));
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  }

  convertAll(input) {
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);
    
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return { error: 'invalid number and unit' };
    }
    
    if (initNum === 'invalid number') {
      return { error: 'invalid number' };
    }
    
    if (initUnit === 'invalid unit') {
      return { error: 'invalid unit' };
    }
    
    const returnNum = this.convert(initNum, initUnit);
    const returnUnit = this.getReturnUnit(initUnit);
    
    if (returnNum === null || returnUnit === 'invalid unit') {
      return { error: 'conversion failed' };
    }
    
    const string = this.getString(initNum, initUnit, returnNum, returnUnit);
    
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    };
  }
}

module.exports = ConvertHandler;