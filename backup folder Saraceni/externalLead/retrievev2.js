'use strict';
let
    Joi = require('joi'),
    db = require(`${requirePath}/components/db`),
    debug = require('debug')('api:externalLead:retrieve');


let validation = {
    query: {
        page: Joi.string(),
        page_id: Joi.string(),
        pagination: Joi.number(),
        limit: Joi.number(),
        order_by: Joi.string()
    },
    params: {
        id: Joi.string()
    }
};

let thisApi = function (req, res) {

    let user = req.user,
        form = req.form,
        data_processing = req.data_processing,
        page_id = req.query.page_id,
        pagination = req.query.pagination,
        limit = req.query.limit,
        order_by = req.query.order_by,
        id = req.params.id;

    console.log("page_id", page_id);

    let findObject = {
        "page_id": page_id
    };

    var page_found = user.own_pages.find(elem => {
        return elem['page'] == page_id;
    })

    console.log('page_found', page_found);

    if (!page_found) {
        res.status(401).send({
            message: 'Utente non autorizzato a eseguire questa richiesta'
        });
    } else {
        if (id) {
            findObject['_id'] = id
        }

        page_id = db.ObjectId(page_id);

        var promises = [];
        promises.push(
            db.ExternalLead.countDocuments({
                page_id: page_id
            })
        );

        if (pagination != undefined && limit != undefined) {
            let order = undefined;
            if (order_by != undefined) {
                let reverseIndex = order_by.indexOf("-");
                if (reverseIndex != -1) {
                    order_by = order_by.slice(1, order_by.length);
                }
                order = {
                    [order_by]: reverseIndex == -1 ? -1 : 1
                }
            } else {
                order = {
                    created_at: -1
                }
            }
            promises.push(
                db.ExternalLead.find({
                    page_id: page_id
                }, {
                    sort: order
                }, {
                    skip: pagination * limit
                }, {
                    limit: limit
                })
            )
        } else {
            promises.push(
                db.ExternalLead.findById(id)
            );
        }
        Promise.all(promises)
            .then(externalLeads_founded => {
                if (pagination != undefined && limit != undefined) {
                    res.status(200).send({
                        type: true,
                        total_count: externalLeads_founded[0],
                        form: forms_founded[1]
                    });
                } else {
                    res.status(200).send({
                        type: true,
                        tag: externalLeads_founded[0]
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(417).send({
                    message: "errore recuperando i link"
                });
            });
    }
}

thisApi['@validation'] = validation
module.exports = exports = thisApi