'use strict'
global.mongoose = require(`mongoose`);
global.db_yeah = require(`./../db/connection`);
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var Persona = require('../model/persona');


function trovaTutti() {
  return db_yeah.Persona.find()
  .then(trovati =>{
    console.log(trovati);
    db_yeah.close();
  })
  .catch(err => {
    console.log('errore nel db', err);
    db_yeah.close();
  })
}

function trovaCondizione(key, value) {
  var persona = {};
  persona[key] = value;
  return db_yeah.Persona.find(persona)
  .then(foundStuff => {
    console.log('persone col nome ', value, ':\n');
    foundStuff.forEach((item, i) => {
      console.log(item);
    });
    db_yeah.close();
  })
  .catch(err => {
    console.log('c\'è stato un errore', err);
    db_yeah.close();
  })
}

//trovaTutti();


//valori chiave valore da mettere per modellare il criterio di ricerca
var key = "name";
var value = "Zarathustra";
trovaCondizione(key, value);
