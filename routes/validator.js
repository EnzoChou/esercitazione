var Joi = require("joi");
var schemas = require("../model/person").schemas;

var validator = (schema, property) => {
  return (req, res, next) => {
    var { error } = Joi.validate(req[property], schema);
    var valid = error == null;

    if (valid) {
      next();
    } else {
      var { details } = error;
      var message = details.map(i => i.message).join(',');
      console.log("error", message);
      res.status(422).json({error: message})
    }
  }
}

module.exports = validator;
