'use strict';
const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
  sourceFile: '../IT Ricette per Foodpairing + ricette italiane.xlsx'
});

console.log(result);

module.exports = result;
