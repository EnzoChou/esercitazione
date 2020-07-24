'use strict'
global.mongoose = require(`mongoose`);
global.db_yeah = require(`./../db/connection`);
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var Persona = require('../model/persona');
//var app = require('../app');

var numeroDiPersoneDaSalvareNelDB = 100;

var persone = [];
var name = ["andrea","brandon","carla",
"davide","enzo","federica","giorgia","herman",
"ilaria","laura","marco","nathaniel","osvaldo",
"paola","quentin","roberta","sabrina","tano","ugo",
"valeria","zarathustra"];
var surname = ["Berardino", "Annunzio", "Bonaventura",
 "Cintio","Amario", "Intino", "Prinzio", "Addario",
  "Ascenzo", "Credico", "Ciuffini", "Ciocca", "Pelliccione",
  "Scarsella", "Cocciolone", "Cetrullo", "Scimia", "Mammarella", "Zappacosta"];

function aggiungiPersone(n) {
  var i = 0;
  while(i<n) {
    let randomName = name[Math.floor(Math.random() * name.length)];
    let randomSurname = surname[Math.floor(Math.random() * surname.length)];
    var persona = new Persona({
      name : randomName,
      surname : randomSurname
    });
    persone.push(persona);
    i++;
  };
};

aggiungiPersone(numeroDiPersoneDaSalvareNelDB);

function salvaColMap(persone){
  /**/
  Promise.map(persone, elem => {
    console.log("persona: ", elem);
    return elem.save();
  }).then( result => {
    console.log('result', result);
    db_yeah.close();
  })
  .catch(err =>{
    console.log('err', err);
    db_yeah.close();
  })

};

function salvaColAll(persone){
  var promises = [];
  persone.forEach(ciccino => {
      var ret = ciccino.save();
      promises.push(ret);
      console.log(ret)
  });
  Promise.all(promises)
  .then( ret => {
    console.log('ritorno then', ret);
    db_yeah.close();
    })
    .catch(err => {
      console.log('err', err);
      db_yeah.close()
    });
};
salvaColMap(persone);
