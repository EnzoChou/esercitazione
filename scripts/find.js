'use strict'
global.mongoose = require(`mongoose`);
global.db_yeah = require(`./../db/connection`);
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var Persona = require('../model/persona');
