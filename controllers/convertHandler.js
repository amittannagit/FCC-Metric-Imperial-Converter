function ConvertHandler() {
 
  this.getNum = function(input) {
    let result;
    let resultArray = input.match(/^[.\d\/]+/);
   
    if (resultArray) {
      let numStr = resultArray[0];
     
      if (numStr.includes('/')) {
        let fractions = numStr.split('/');
        if (fractions.length > 2) {
          return 'invalid number';
        }
        result = fractions.length === 2 ? parseFloat(fractions[0]) / parseFloat(fractions[1]) : parseFloat(numStr);
      } else {
        result = parseFloat(numStr);
      }
    } else {
      result = 1;
    }
   
    return isNaN(result) ? 'invalid number' : result;
  };
 
  this.getUnit = function(input) {
    const match = input.match(/[a-zA-Z]+$/);
    if (!match) return 'invalid unit';
   
    const unit = match[0].toLowerCase();
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    return validUnits.includes(unit) ? (unit === 'l' ? 'L' : unit) : 'invalid unit';
  };
 
  this.getReturnUnit = function(initUnit) {
    const units = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    return units[initUnit] || 'invalid unit';
  };
 
  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    return unitNames[unit] || 'invalid unit';
  };
 
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
   
    const conversions = {
      'gal': { to: 'L', factor: galToL },
      'L': { to: 'gal', factor: 1 / galToL },
      'lbs': { to: 'kg', factor: lbsToKg },
      'kg': { to: 'lbs', factor: 1 / lbsToKg },
      'mi': { to: 'km', factor: miToKm },
      'km': { to: 'mi', factor: 1 / miToKm }
    };
   
    if (conversions[initUnit]) {
      return parseFloat((initNum * conversions[initUnit].factor).toFixed(5));
    }
    return null;
  };
 
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit';
    }
    if (initNum === 'invalid number') {
      return 'invalid number';
    }
    if (initUnit === 'invalid unit') {
      return 'invalid unit';
    }
    
    const initUnitName = this.spellOutUnit(initUnit);
    const returnUnitName = this.spellOutUnit(returnUnit);
   
    return `${initNum} ${initUnitName} converts to ${returnNum.toFixed(5)} ${returnUnitName}`;
  };
}

module.exports = ConvertHandler;