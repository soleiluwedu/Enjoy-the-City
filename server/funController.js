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

const funController = {
	getData: (req, res) => {

		console.log(`✉️ ${style.cyan}GET request received for ${style.red}${req.url}${style.reset}`);

		switch (req.url) {
			case `/firstdate`: findPlaces(res, [
				{ code: 342, desc: `☕️ First date is the crazy-check. Start with a cafe.` },
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 402, desc: `⛸ If it goes well, how about skating?` }
					: { code: 463, desc: `🕹 If it goes well, how about the arcade?` }
			]); break;
			case `/seconddate`: findPlaces(res, [
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 139, desc: `🤡 Try on some costumes.` }
					: { code: 336, desc: `🔮 See a psychic together.` },
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 311, desc: `🎟 Visit a museum.` }
					: { code: 310, desc: `🎨 Go to an art gallery.` },
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 362, desc: `🥙 Relax with some Middle Eastern cuisine.` }
					: { code: 359, desc: `🍱 Have some Japanese.` }
			]); break;
			case `/thirddate`: findPlaces(res, [
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 358, desc: `🍝 Let's start with dinner at an Italian restaurant.` }
					: { code: 364, desc: `🍤 Let's start with dinner at a seafood restaurant.` },
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 333, desc: `🎭 Go see a show.` }
					: { code: 330, desc: `🎤 Sing karaoke and embarrass yourself.` },
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 316, desc: `🍷 Talk about it over wine.` }
					: { code: 313, desc: `🛋 Relax and talk to each other at a lounge.` }
			]); break;
			case `/fourthdate`: findPlaces(res, [
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 311, desc: `🎟 Start the day at a museum.` }
					: { code: 310, desc: `🎨 Go to an art gallery.` },
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 364, desc: `🍤 Enjoy some seafood.` }
					: { code: 366, desc: `🍣 Enjoy sushi.` },
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 282, desc: `💆🏼 Get massages together.` }
					: { code: 148, desc: `💐 Maybe flowers are in order.` }
			]); break;
			case `/fifthdate`: findPlaces(res, [
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 389, desc: `⛰ Go hiking.` }
					: { code: 380, desc: `🏇 Go horseback riding.` },
				Math.ceil(Math.random() * 2) % 2 === 1
					? { code: 356, desc: `🥖 Dine at a French restaurant.` }
					: { code: 414, desc: `🤸 Take a yoga class together.` },
				{ code: 343, desc: `🍰 If this person made it to a fifth date, he/she deserves dessert.` }
			]); break;
			case `/goingwell`: findPlaces(res, [
				{ code: 436, desc: `🏩 Is the date going well?` }
			]); break;
			case `/meat`: findPlaces(res, [
				{ code: 349, desc: `🍖 Go to a BBQ joint.` },
				{ code: 365, desc: `🐄 Or have a nice steak.` }
			]); break;
			case `/nomeat`: findPlaces(res, [
				{ code: 368, desc: `🥗 Not eating anything that had parents.` }
			]); break;
			case `/largegroup`: findPlaces(res, [
				{ code: 113, desc: `🏖 How about the beach?` },
				{ code: 118, desc: `🏕 Or maybe the park?` },
				{ code: 313, desc: `🛋 Maybe chill at a lounge.` },
				{ code: 332, desc: `🎞 Don't feel like talking to everyone? See a movie.` }
			]); break;
			case `/nightout`: findPlaces(res, [
				{ code: 334, desc: `💃🏼 Have a night out at the club.` },
				{ code: 314, desc: `🎷 Let the jazz take over your ears.` },
				{ code: 318, desc: `👠 End it with some late night entertainment.` }
			]); break;
			case `/learn`: findPlaces(res, [
				{ code: 377, desc: `🥋 Train in a martial art.` },
				{ code: 311, desc: `🎟 Visit a museum.` },
				{ code: 336, desc: `🔮 Find out your fortune.` }
			]); break;
			case `/allday`: findPlaces(res, [
				{ code: 370, desc: `🍷 Take a trip to the winery.` },
				{ code: 152, desc: `🧀 Have some cheese with that wine.` },
				{ code: 451, desc: `⛳ Air it out on the golf course.` },
				{ code: 285, desc: `💆🏼 Treat your body well at the spa.` },
				{ code: 389, desc: `⛰ Explore a trail.` }
			]); break;
			case `/nogoingback`: findPlaces(res, [
				{ code: 283, desc: `📌 Get a body piercing.` },
				{ code: 287, desc: `🖋 Put ink on your body.` }
			]); break;
			case `/nature`: findPlaces(res, [
				{ code: 109, desc: `🌺 Stroll the gardens.` },
				{ code: 113, desc: `🏖 Get tanned at the beach.` },
				{ code: 118, desc: `🏕 Relax at the park.` }
			]); break;
			case `/sweettooth`: findPlaces(res, [
				{ code: 151, desc: `🍭 Pig out at the candy store. No shame.` },
				{ code: 343, desc: `🍰 Tons of desserts to choose from.` },
				{ code: 344, desc: `🍨 Everyone loves ice cream.` }
			]); break;
			case `/getaway`: findPlaces(res, [
				{ code: 431, desc: `🛳 Go on a cruise.` },
				{ code: 436, desc: `🏩 Check into a hotel.` },
				{ code: 438, desc: `🍹 Splurge on a resort.` }
			]); break;

			case `/landmark`: findPlaces(res, [107]); break;
			case `/garden`: findPlaces(res, [109]); break;
			case `/natural`: findPlaces(res, [112]); break;
			case `/beach`: findPlaces(res, [113]); break;
			case `/lake`: findPlaces(res, [116]); break;
			case `/park`: findPlaces(res, [118]); break;
			case `/bookstore`: findPlaces(res, [130]); break;
			case `/costumes`: findPlaces(res, [139]); break;
			case `/fashion`: findPlaces(res, [142]); break;
			case `/jewelry`: findPlaces(res, [144]); break;
			case `/shoes`: findPlaces(res, [145]); break;
			case `/flea`: findPlaces(res, [147]); break;
			case `/florist`: findPlaces(res, [148]); break;
			case `/alcohol`: findPlaces(res, [150]); break;
			case `/candy`: findPlaces(res, [151]); break;
			case `/cheese`: findPlaces(res, [152]); break;
			case `/farmersmkt`: findPlaces(res, [154]); break;
			case `/pawn`: findPlaces(res, [166]); break;
			case `/spgoods`: findPlaces(res, [170]); break;
			case `/wedding`: findPlaces(res, [176]); break;
			case `/jobs`: findPlaces(res, [212]); break;
			case `/massage`: findPlaces(res, [282]); break;
			case `/piercing`: findPlaces(res, [283]); break;
			case `/spa`: findPlaces(res, [285]); break;
			case `/tanning`: findPlaces(res, [286]); break;
			case `/tattoo`: findPlaces(res, [287]); break;
			case `/tailor`: findPlaces(res, [304]); break;
			case `/art`: findPlaces(res, [309]); break;
			case `/artgallery`: findPlaces(res, [310]); break;
			case `/museum`: findPlaces(res, [311]); break;
			case `/bar`: findPlaces(res, [312]); break;
			case `/lounge`: findPlaces(res, [313]); break;
			case `/jazz`: findPlaces(res, [314]); break;
			case `/winebar`: findPlaces(res, [316]); break;
			case `/adult`: findPlaces(res, [318]); break;
			case `/billiards`: findPlaces(res, [320]); break;
			case `/bowling`: findPlaces(res, [322]); break;
			case `/hookah`: findPlaces(res, [329]); break;
			case `/karaoke`: findPlaces(res, [330]); break;
			case `/minigolf`: findPlaces(res, [331]); break;
			case `/movie`: findPlaces(res, [332]); break;
			case `/show`: findPlaces(res, [333]); break;
			case `/nightclub`: findPlaces(res, [334]); break;
			case `/psychic`: findPlaces(res, [336]); break;
			case `/brewery`: findPlaces(res, [341]); break;
			case `/cafe`: findPlaces(res, [342]); break;
			case `/dessert`: findPlaces(res, [343]); break;
			case `/icecream`: findPlaces(res, [344]); break;
			case `/restaurant`: findPlaces(res, [347]); break;
			case `/american`: findPlaces(res, [348]); break;
			case `/bbq`: findPlaces(res, [349]); break;
			case `/buffet`: findPlaces(res, [350]); break;
			case `/burgers`: findPlaces(res, [351]); break;
			case `/chinese`: findPlaces(res, [352]); break;
			case `/deli`: findPlaces(res, [353]); break;
			case `/diner`: findPlaces(res, [354]); break;
			case `/french`: findPlaces(res, [356]); break;
			case `/indian`: findPlaces(res, [357]); break;
			case `/italian`: findPlaces(res, [358]); break;
			case `/japanese`: findPlaces(res, [359]); break;
			case `/korean`: findPlaces(res, [360]); break;
			case `/mexican`: findPlaces(res, [361]); break;
			case `/middleeastern`: findPlaces(res, [362]); break;
			case `/pizza`: findPlaces(res, [363]); break;
			case `/seafood`: findPlaces(res, [364]); break;
			case `/steak`: findPlaces(res, [365]); break;
			case `/sushi`: findPlaces(res, [366]); break;
			case `/thai`: findPlaces(res, [367]); break;
			case `/veg`: findPlaces(res, [368]); break;
			case `/countryclub`: findPlaces(res, [369]); break;
			case `/winery`: findPlaces(res, [370]); break;
			case `/martialarts`: findPlaces(res, [377]); break;
			case `/dance`: findPlaces(res, [379]); break;
			case `/horseback`: findPlaces(res, [380]); break;
			case `/golf`: findPlaces(res, [382]); break;
			case `/hiking`: findPlaces(res, [389]); break;
			case `/tennis`: findPlaces(res, [399]); break;
			case `/skating`: findPlaces(res, [402]); break;
			case `/yoga`: findPlaces(res, [414]); break;
			case `/cruise`: findPlaces(res, [431]); break;
			case `/lodging`: findPlaces(res, [432]); break;
			case `/hotel`: findPlaces(res, [436]); break;
			case `/resort`: findPlaces(res, [438]); break;
			case `/golfcourse`: findPlaces(res, [451]); break;
			case `/arcade`: findPlaces(res, [463]); break;
			default: res.status(404).send(`Error 404. '${req.url}' not found.`);
		}
	}
}

// Gets data from Factual.com API and returns it to client
const findPlaces = (res, codeDescArr) => {

	const vows = codeDescArr.map(codeDesc =>
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

module.exports = funController;
