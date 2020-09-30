'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

var inputFile = '../others/ricette.xlsx';
var outputFile = '../json/ricette.json';

const result = function () {
  return excelToJson({
    sourceFile: inputFile
  });
}

function toJsonFile(result) {
  var json = JSON.stringify(result, null, 4);
  fs.writeFile(outputFile, json, function (err) {
    if (err) throw err;
    console.log('Results saved in', outputFile);
  });
}

console.log(result());

module.exports = result;