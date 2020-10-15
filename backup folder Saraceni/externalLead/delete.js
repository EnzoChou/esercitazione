let
	db = require(`${requirePath}/components/db`),
	Joi = require('joi'),
	debug = require('debug')('api:externalLead:delete');


let validation = {
	params: {
		id: Joi.string().required(),
	},
	query: {
		page_id: Joi.string().required()
	}
};


let thisApi = function (req, res) {

	let
		user = req.user,
		id = req.params.id;
		page_id = req.query.page_id;

	var page_found = user.own_pages.find(elem => {
		return elem['page'] == page_id.toString();
	});
	if (!page_found) {
		res.status(401).send({
			message: 'Utente non autorizzato a eseguire questa richiesta'
		});
	}else{
		db.externalLead.findOne({
			'_id': id
		})
		.then(external_lead_founded => {
			if(!external_lead_founded){
				res.status(409).send({
					status: 409,
					message: 'external lead non trovato',
					developerMessage: err,
					error: false,
				});
			}else{
				external_lead_founded.remove(function (err, external_lead_removed) {
					if (err) {
						debug(err);
						res.status(417).send({
							status: 417,
							message: 'Qualcosa è andato storto nella cancellazione del target',
							developerMessage: err,
							error: false,
						});
					} else {
						res.status(200).send({
							type: true,
							target: external_lead_removed
						})
					}
				});
			}
			
		})
		.catch(err => {
			console.log(err);
			res.status(417).send({
				status: 417,
				message: 'Errore nel recupero del target',
				developerMessage: err,
				error: false,
			});
		});
	}
};

thisApi['@validation'] = validation
module.exports = exports = thisApi