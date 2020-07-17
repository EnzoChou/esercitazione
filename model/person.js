var mongoose = require("mongoose");
var Joi = require("joi");

//schema della persona
var personSchema = new mongoose.Schema({
  name : {
    type : String,
    required : "Required"
  },
  surname : {
    type : String,
    required : "Required"
  },
  birthplace : {
    type : String
  },
  birthdate : {
    type : Date
  }

});

//module.exports = mongoose.model( 'Persona', personSchema, 'Persone' );

var schemas = {
  person: Joi.object().keys({
    name: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
    surname: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
    birthplace: Joi.string(),
    birthdate: Joi.date()
  }),
  personLIST: Joi.object().keys({
    page: Joi.number().required(),
    pageSize: Joi.number().required()
  }),
  personId: Joi.object().keys({
    personId: Joi.string().alphanum().min(1).required()
  })
  // define other schemas the same way as person

};

module.exports = {
  person: mongoose.model( 'Persona', personSchema, 'Persone' ),
  schemas: schemas
};
