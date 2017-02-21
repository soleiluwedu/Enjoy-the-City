`use strict`

const request = require(`request`);
const Factual = require(`factual-api`);
const factual = new Factual(`Jr4VU8j7IWGNP3P8tg2x21WVC58Opn0w7Zr5EUeo`, `rYkYbju3AROrBb3E4HM9PriEsCfrgzXvoTaQNJet`);

// Gets data from Factual.com API and returns it to client.
const factualReqController = {
	getVenues: (req, res, next) => {
		if (res.locals.err) return next();
		const vows = req.params.codesToReq.map(codeDesc =>
			new Promise((resolve, reject) => {
				factual.get(
					`/t/places-us`,
					{ filters: { "$and": [{ locality: req.body.locality, category_ids: { "$includes": codeDesc.code } }] } },
					(err, factResObj) => !err ? resolve({ venues: factResObj.data, desc: codeDesc.desc }) : reject(err)
				);
			})
		);
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

module.exports = factualReqController;
