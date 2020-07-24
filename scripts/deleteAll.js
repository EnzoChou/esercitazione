'use strict'
global.mongoose = require(`mongoose`);
global.db_yeah = require(`./../db/connection`);
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var Persona = require('../model/persona');



function cancellaById(id) {
  Promise.try(function() {
    return db_yeah.Persona.findById(id)
  })
  .then( persona => {
    if(persona != null || persona != undefined) {
      console.log('persona trovata', persona);
      return persona.delete();
    }
    else {
      throw "id not found";
    }
  })
  .then( result => {
    console.log(result)
    db_yeah.close();
  })
  .catch( err => {
    console.log('err', err);
    db_yeah.close();
  });
};

function brasaTutto() {
  return db_yeah.Persona.find()
  .then()
  .catch()
  db_yeah.close();
};

//cancellaById('5f1166121db9661b385f29de');
brasaTutto();
