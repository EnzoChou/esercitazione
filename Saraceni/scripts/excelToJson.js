'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

var inputFile = '../others/ricette.xlsx';
var outputFile = '../json/ricette.json';

const result = excelToJson({
  sourceFile: inputFile
});

function toJsonFile(result) {
  let json = JSON.stringify(result, null, 4);
  fs.writeFile(outputFile, json, function (err) {
    if (err) throw err;
    console.log('Results saved in', outputFile);
  });
}

toJsonFile(result);

module.exports = result;
