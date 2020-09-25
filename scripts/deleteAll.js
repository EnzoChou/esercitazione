'use strict'
global.mongoose = require(`mongoose`);
global.db_yeah = require(`./../db/connection`);
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var Persona = require('../model/persona');



function cancellaById(id) {
  Promise.try(function () {
    return db_yeah.Persona.findById(id)
  })
    .then(persona => {
      if (persona != null || persona != undefined) {
        console.log('persona trovata e nel processo di cancellazione', persona);
        return persona.delete();
      }
      else {
        throw "id not found";
      }
    })
    .then(result => {
      console.log(result)
      db_yeah.close();
    })
    .catch(err => {
      console.log('err', err);
      db_yeah.close();
    });
};

function brasaTutto() {
  return db_yeah.Persona.find()
    .then(personeTrovate => {
      var promises = [];
      personeTrovate.forEach((persona, i) => {
        console.log('persona trovata', persona);
        var ret = persona.delete();
        promises.push(ret);
      });
      Promise.all(promises)

        .then(personeCancellate => {
          console.log(personeCancellate);
          db_yeah.close();
        })
        .catch(err => {
          throw err;
        })
    })
    .catch(err => {
      console.log('err', err);
      db_yeah.close();
    })
};

function cancellaInizioLetteraCorsiva() {
  return db_yeah.Persona.find({
    $or: [
      {
        name: {
          $regex: /^[a-z]/
        },
        surname: {
          $regex: /^[a-z]/
        }
      }

    ]
  })
    .then(trovati => {
      console.log('persone trovate che iniziano con la lettera corsiva', trovati);
      var promises = [];
      trovati.forEach((persona, i) => {
        var ret;
        ret = persona.delete();
        promises.push(ret);
      });
      return Promise.all(promises)
        .then(risposta => {
          console.log('risposta db', risposta);
          db_yeah.close();
        })
        .catch(err => {
          console.log('err', err);
          db_yeah.close();
        })
    })
};

//cancellaById('5f1166121db9661b385f29de'); //decommentare questa riga per usare il metodo cancellaById
brasaTutto(); //decommentare questa riga per usare il metodo brasaTutto
//cancellaInizioLetteraCorsiva(); //decommentare questa riga per usare il metodo cancellaInizioLetteraCorsiva
