`use strict`

const request = require(`request`);
const Factual = require(`factual-api`);
const factual = new Factual(`Jr4VU8j7IWGNP3P8tg2x21WVC58Opn0w7Zr5EUeo`, `rYkYbju3AROrBb3E4HM9PriEsCfrgzXvoTaQNJet`);

const style = {
	reset: `\x1b[0m`,
	bold: `\x1b[1m`,
	faint: `\x1b[2m`,
	standout: `\x1b[3m`,
	underline: `\x1b[4m`,
	blink: `\x1b[5m`,
	inverse: `\x1b[7m`,
	hidden: `\x1b[8m`,
	nostandout: `\x1b[23m`,
	nounderline: `\x1b[24m`,
	noblink: `\x1b[25m`,
	noreverse: `\x1b[27m`,
	black: `\x1b[30m`,
	red: `\x1b[31m`,
	green: `\x1b[32m`,
	yellow: `\x1b[33m`,
	blue: `\x1b[34m`,
	magenta: `\x1b[35m`,
	cyan: `\x1b[36m`,
	white: `\x1b[37m`
}

// Gets data from Factual.com API and returns it to client.
const factualReqController = {
	getVenues: (req, res, next) => {
		const vows = req.params.codesToReq.map(codeDesc =>
			new Promise((resolve, reject) => {
				factual.get(
					`/t/places-us`,
					{ filters: { "$and": [{ locality: "los angeles", category_ids: { "$includes": codeDesc.code } }] } },
					(err, factResObj) => !err ? resolve({ venues: factResObj.data, desc: codeDesc.desc }) : reject(error)
				);
			})
		);
		Promise.all(vows)
			.then(objArr => res.json(objArr.map(obj => { return { venue: obj.venues[Math.floor(Math.random() * obj.venues.length)], desc: obj.desc } })))
			.catch(err => {
				console.log(`❗️${style.bold}${style.red}${err}${style.reset}`);
				res.send(err);
			});
	}
}

module.exports = factualReqController;