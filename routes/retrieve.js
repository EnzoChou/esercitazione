var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var connection = require('../db/connection');
var Person = require("../model/person");
var personModel = mongoose.model('Persona');

/* GET users listing. */
router.get('/', (req, res, next) => {

  connection.connect();
  personModel.find((err, docs) => {
    if (!err) {
      res.render('retrieve', {
        data : docs
      });
      connection.disconnect();
    }
    else {

    }
    console.log(docs);
  });
});

router.get('/:personId', (req, res, next) => {
  var id = req.params.personId;
  connection.connect();
  personModel.findById(id)
  .exec()
  .then( doc => {
    connection.disconnect();
    console.log("from database", doc )
    if ( doc != undefined ) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({
        message : "no valid entry provided;"
      });
    };
  })
  .catch( err => {
    connection.disconnect();
    res.status(500).json( {
      error : err
    });
  });
});

module.exports = router;
