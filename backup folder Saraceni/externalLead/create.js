'use strict';

const externalLead = require('../../models/externalLead');

let
    Joi = require('joi'),
    db = require(`${requirePath}/components/db`),
    config = require(`${requirePath}/config`),
    request = require('request'),
    debug = require('debug')('api:externalLead:create'),
    common = require('${requirePath}/api/common/functions');


let validation = {
    "body": Joi.object({
        "externalLead": Joi.object({
            "page_id": Joi.string().required(),
            "form": Joi.object({}).required(),
            "data_processing": Joi.boolean().required()
        })
    })
};

let thisApi = function (req, res) {

    let user = req.user,
        externalLead = req.body.externalLead,
        page_id = req.body.externalLead.page_id;

    externalLead.user_creator = user['_id'];

    let name_bot = common.magicString(externalLead._id);
    externalLead.name_bot = name_bot;

    var page_found = user.own_pages.find(elem => {
        return elem['page'] == page_id;
    });

    if (!page_found) {
        res.status(401).send({
            message: 'Utente non autorizzato a eseguire questa richiesta'
        });
    } else {
        db.Page.findById(page_id, function (err, page) {
            if (err || !page) {
                console.log(err);
                res.status(417).send({
                    message: 'si è verificato un errore cercando la pagina dell\'utente, vedere log'
                });
            } else {
                let newExternalLead = new db.ExternalLead(externalLead);
                newExternalLead.save(function (err, savedExternalLead) {
                    if (err) {
                        console.log('err yeah', err);
                        res.status(417).send({
                            type: false,
                            message: 'errore salvando il nuovo lead esterno in Yeah'
                        });
                    } else {
                        res.status(200).send({
                            type: true,
                            externalLead: savedExternalLead
                        });
                    }
                }, {
                    new: true
                });
            }
        })
    }

};

thisApi['@validation'] = validation
module.exports = exports = thisApi