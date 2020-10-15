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

    // TAG
    // "_id": "5a380165b2d6bde9e3a40493", <-----
    // "name": "prova",
    // "page_id": "5a33c088c1a1b88953656bd4", <-----
    // "user_creator": "5a33b10e15fca883ce43a325",
    // "updated_at": "2017-12-18T17:56:53.400Z",
    // "created_at": "2017-12-18T17:56:53.400Z",
    // "users": []

    // EXTERNAL LEAD
    // "_id": "5b46247654ac3c412eec855c", <-----
    // "page_id": "5ae9bec512db32179c20304d", <-------
    // "form": {
    //     "consent_survey": 0,
    //     "consent_data": 0,
    //     "consent_marketProfiling": 0,
    //     "consent_marketResearch": 0,
    //     "Timestamp": "2018-07-11T15:38:30.585Z",
    //     "RequestType": "Quote Request",
    //     "External_Source": "hejai.facebook",
    //     "Car_Model": "NX",
    //     "CAP": "00120",
    //     "telephone": "333 33 33 333",
    //     "lastname": "Paolo Molinara",
    //     "firstname": "Paolo Molinara",
    //     "email": "pmolinara@gmail.com"
    // },
    // "data_processing": false

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
                db.ExternalLead.aggregate(
                    [{
                            "$match": {
                                "page_id": page_id
                            }
                        },
                        {
                            "$project": {
                                data_processing: 1,
                                form: 1,
                                api_result: {
                                    $ifNull: ["$api_result", {}]
                                },
                                created_at: {
                                    $ifNull: ["$created_at", ""]
                                },
                                info: {
                                    $ifNull: ["$info", {}]
                                },
                                $service: {
                                    $ifNull: ["$service", ""]
                                }
                            }
                        },
                        {
                            $sort: order
                        },
                        {
                            $skip: pagination * limit
                        },
                        {
                            $limit: limit
                        }
                    ]));
        } else {
            promises.push(
                db.ExternalLead.aggregate(
                    [{
                            "$match": {
                                "page_id": page_id
                            }
                        },
                        {
                            "$project": {
                                data_processing: 1,
                                form: 1,
                                api_result: {
                                    $ifNull: ["$api_result", {}]
                                },
                                created_at: {
                                    $ifNull: ["$created_at", ""]
                                },
                                info: {
                                    $ifNull: ["$info", {}]
                                },
                                $service: {
                                    $ifNull: ["$service", ""]
                                }
                            }
                        }
                    ]));
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

// mongodb://hej-db-root:hejj2017@ds139585.mlab.com:39585/dashboard-dev



thisApi['@validation'] = validation
module.exports = exports = thisApi