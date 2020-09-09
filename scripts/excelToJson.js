'use strict';
const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    sourceFile: '../Ricette per Foodpairing + ricette italiane_25_8.xlsx'
});

console.log(result);
