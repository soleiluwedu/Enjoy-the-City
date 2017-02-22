'use strict'

const request = require('request');
const Factual = require('factual-api');
const factual = new Factual('Jr4VU8j7IWGNP3P8tg2x21WVC58Opn0w7Zr5EUeo', 'rYkYbju3AROrBb3E4HM9PriEsCfrgzXvoTaQNJet');

// Communicates with Factual.com Places API
const factualReqCtrl = {

	// Makes one request per category of venue.
	getVenues: (req, res, next) => {

		// In case of error, immediately forward through middleware to serverside logger (last middleware).
		if (res.locals.err) return next();

		// For each code in res.locals.codesToReq, request data from Factual.com Places API.
		const vows = res.locals.codesToReq.map(codeDesc =>
			new Promise((resolve, reject) => {
				factual.get(
					'/t/places-us',
					{ filters: { "$and": [{ locality: req.body.locality, category_ids: { "$includes": codeDesc.code } }] } },
					(err, factResObj) => !err ? resolve({ venues: factResObj.data, desc: codeDesc.desc }) : reject(err)
				);
			})
		);

		// When all requests are resolved, res.json successful data back to the client, or save error to res.locals.err.
		Promise.all(vows)
			.then(objArr => {
				res.json(objArr.map(obj => { return { venue: obj.venues[Math.floor(Math.random() * obj.venues.length)], desc: obj.desc } }));
				return next();
			})
			.catch(err => {
				res.send(err);
				res.locals.err = err;
				return next();
			});
	}

}

module.exports = factualReqCtrl;
