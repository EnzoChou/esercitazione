'use strict'
global.mongoose = require(`mongoose`);
global.db_yeah = require(`./../db/connection`);
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var Persona = require('../model/persona');

function aggregationSubscriptionSurvey() {
  var persona = {};
  return db_yeah.Persona.aggregate([
    { $match : { subscription : true } },
    { $group : { _id : "$status", total : { $sum : 1 } } },
    { $sort: { total: -1 } }
  ])
  .then(found =>{
    //console.log(found);
    found.forEach((item, i) => {
      console.log('persone', item._id, 'iscritte ai nostri servizi:', item.total);
    });

    //console.log('le persone col', key, '\"', value, '\"', 'trovate nel database sono:', found[0].total);
    db_yeah.close();
  })
  .catch(err =>{
    console.log('err', err);
    db_yeah.close();
  })
}


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
  var contatore = 0;
  return db_yeah.Persona.find(persona)
  .then(foundStuff => {
    console.log('persone col', key, value, ':\n');
    foundStuff.forEach((item, i) => {
      contatore++;
      console.log(item);
    });
    console.log('numero di persone col',key, value, 'trovate sono', contatore, '\n\n');
    db_yeah.close();
  })
  .catch(err => {
    console.log('c\'è stato un errore', err);
    db_yeah.close();
  })
}

//trovaTutti(); //decommentare per trovare tutti


//valori chiave valore da mettere per modellare il criterio di ricerca
//var key = "surname";
//var value = "Bonaventura";
//trovaCondizione(key, value);
aggregationSubscriptionSurvey();
