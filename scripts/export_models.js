// esempio per leggere file in una cartella e per ogni file eseguire il require del codice al suo interno


var Promise = require('bluebird');
var chalk = require('chalk');
//var lodash = require('lodash');
var fs = Promise.promisifyAll(require("fs"));
var path = require('path');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

global.mongoose = require(`mongoose`);
global.db_yeah = require(`./../db/connection`);

return fs
    .readdirAsync('./../model')
    .then(res => {
        console.log("res", res);

        res.forEach(elem => {
            var export_model = elem.replace(".js", "");
            export_model = capitalizeFirstLetter(export_model);
            db_yeah[export_model] = require('./../model/' + export_model);
        });

        console.log("db_yeah", db_yeah);
        return;
    })
    .then(res1 => {
        db_yeah.close();
        console.log('THIS IS THE END!');
        return;
    })
    .catch(err => {
      db_yeah.close();
        console.log("err", err);
        return;
    });
