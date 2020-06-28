var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var connection = require('../db/connection');
var Person = require("../model/person");
var personModel = mongoose.model('Persona');

/* GET users listing. */
router.get('/:personId', function(req, res, next) {
  //res.send('respond with a resource');
  var id = req.params.personId;
  connection.connect();
  personModel.deleteOne({ _id : id })
  .exec()
  .then( result => {
    connection.disconnect();
    res.status( 200 ).json( result );
  })
  .catch( err => {
    connection.disconnect();
    console.log( error )
    res.status(500).json( {
      error : err
    });
  });
});

module.exports = router;
