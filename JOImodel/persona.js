var Joi = require("joi");

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

module.exports = schemas;
