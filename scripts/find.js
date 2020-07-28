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

var cognome = "Credico";

function trovaCondizione(surname) {
  return db_yeah.Persona.find({ surname : surname })
  .then(trovati => {
    console.log('persone col cognome ', surname, ':\n');
    trovati.forEach((item, i) => {
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
trovaCondizione(cognome);
