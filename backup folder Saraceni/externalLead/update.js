let
    validSchemas = require(`${requirePath}/api/validation/`),
    db = require(`${requirePath}/components/db`),
    Joi = require('joi'),
    debug = require('debug')('api:externalLead:update'),
    config = require(`${requirePath}/config`);

let validation = {
    params: {
        id: Joi.string().required()
    },
    query: {
        page_id: Joi.string().required()
    },
    body:{
        externalLead: Joi.object().required()
    }
};

function mapFunction(e) {
    return  e.users.length
}

let thisApi = function (req, res) {

    let
        user = req.user,
        id = req.params.id,
        page_id = req.query.page_id,
        externalLead = req.body.externalLead;
        
                
    var page_found = user.own_pages.find(elem => {
        return elem['page'] == page_id.toString();
    });

    if (!page_found) {
        res.status(401).send({
            message: 'Utente non autorizzato a eseguire questa richiesta'
        });
    } else {

        db.externalLead.findOneAndUpdate({
            '_id': id
        }, externalLead, {new:true})
        .lean()
        .then(external_lead_updated => {
            console.log("external_lead_updated",external_lead_updated)
            external_lead_updated.users = mapFunction(external_lead_updated);
                res.status(200).send({
                    type: true,
                    tag: external_lead_updated
                });

            })
            .catch(err => {
                console.log(err);
                res.status(417).send({
                    status: 417,
                    message: 'Errore recupero della lead esterna cercata',
                    developerMessage: err,
                    error: false,
                });
            });

    }

};

thisApi['@validation'] = validation
module.exports = exports = thisApi