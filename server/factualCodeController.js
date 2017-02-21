`use strict`

const factualCodes = {
	landmark: 107,
	garden: 109,
	natural: 112,
	beach: 113,
	lake: 116,
	park: 118,
	bookstore: 130,
	costumes: 139,
	fashion: 142,
	jewelry: 144,
	shoes: 145,
	flea: 147,
	florist: 148,
	alcohol: 150,
	candy: 151,
	cheese: 152,
	farmersmarket: 154,
	pawn: 166,
	spgoods: 170,
	wedding: 176,
	jobs: 212,
	massage: 282,
	piercing: 283,
	spa: 285,
	tanning: 286,
	tattoo: 287,
	tailor: 304,
	art: 309,
	artgallery: 310,
	museum: 311,
	bar: 312,
	lounge: 313,
	jazz: 314,
	winebar: 316,
	adult: 318,
	billiards: 320,
	bowling: 322,
	hookah: 329,
	karaoke: 330,
	minigolf: 331,
	movie: 332,
	show: 333,
	nightclub: 334,
	psychic: 336,
	brewery: 341,
	cafe: 342,
	dessert: 343,
	icecream: 344,
	restaurant: 347,
	american: 348,
	bbq: 349,
	buffet: 350,
	burgers: 351,
	chinese: 352,
	deli: 353,
	diner: 354,
	french: 356,
	indian: 357,
	italian: 358,
	japanese: 359,
	korean: 360,
	mexican: 361,
	middleeastern: 362,
	pizza: 363,
	seafood: 364,
	steak: 365,
	sushi: 366,
	thai: 367,
	veg: 368,
	countryclub: 369,
	winery: 370,
	martialarts: 377,
	dance: 379,
	horseback: 380,
	golf: 382,
	hiking: 389,
	tennis: 399,
	skating: 402,
	yoga: 414,
	cruise: 431,
	lodging: 432,
	hotel: 436,
	resort: 438,
	golfcourse: 451,
	arcade: 463
}

const routesAndCodes = {
	firstdate: [
		{ code: factualCodes.cafe, desc: `☕️ First date is the crazy-check. Start with a cafe.` },
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.skating, desc: `⛸ If it goes well, how about skating?` }
			: { code: factualCodes.arcade, desc: `🕹 If it goes well, how about the arcade?` }
	],
	seconddate: [
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.costumes, desc: `🤡 Try on some costumes.` }
			: { code: factualCodes.psychic, desc: `🔮 See a psychic together.` },
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.museum, desc: `🎟 Visit a museum.` }
			: { code: factualCodes.artgallery, desc: `🎨 Go to an art gallery.` },
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.middleeastern, desc: `🥙 Relax with some Middle Eastern cuisine.` }
			: { code: factualCodes.japanese, desc: `🍱 Have some Japanese.` }
	],
	thirddate: [
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.italian, desc: `🍝 Let's start with dinner at an Italian restaurant.` }
			: { code: factualCodes.seafood, desc: `🍤 Let's start with dinner at a seafood restaurant.` },
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.show, desc: `🎭 Go see a show.` }
			: { code: factualCodes.karaoke, desc: `🎤 Sing karaoke and embarrass yourself.` },
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.winebar, desc: `🍷 Talk about it over wine.` }
			: { code: factualCodes.lounge, desc: `🛋 Relax and talk to each other at a lounge.` }
	],
	fourthdate: [
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.museum, desc: `🎟 Start the day at a museum.` }
			: { code: factualCodes.artgallery, desc: `🎨 Go to an art gallery.` },
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.seafood, desc: `🍤 Enjoy some seafood.` }
			: { code: factualCodes.sushi, desc: `🍣 Enjoy sushi.` },
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.massage, desc: `💆🏼 Get massages together.` }
			: { code: factualCodes.florist, desc: `💐 Maybe flowers are in order.` }
	],
	fifthdate: [
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.hiking, desc: `⛰ Go hiking.` }
			: { code: factualCodes.horseback, desc: `🏇 Go horseback riding.` },
		Math.ceil(Math.random() * 2) % 2 === 1
			? { code: factualCodes.french, desc: `🥖 Dine at a French restaurant.` }
			: { code: factualCodes.yoga, desc: `🤸 Take a yoga class together.` },
		{ code: factualCodes.dessert, desc: `🍰 If this person made it to a fifth date, he/she deserves dessert.` }
	],
	goingwell: [
		{ code: factualCodes.hotel, desc: `🏩 Date going well? Let it end well.` },
	],
	meat: [
		{ code: factualCodes.bbq, desc: `🍖 Go to a BBQ joint.` },
		{ code: factualCodes.steak, desc: `🐄 Or have a nice steak.` }
	],
	nomeat: [
		{ code: factualCodes.veg, desc: `🥗 Not eating anything that had parents.` }
	],
	largegroup: [
		{ code: factualCodes.beach, desc: `🏖 How about the beach?` },
		{ code: factualCodes.park, desc: `🏕 Have fun at the park.` },
		{ code: factualCodes.lounge, desc: `🛋 Maybe chill at a lounge.` },
		{ code: factualCodes.movie, desc: `🎞 Don't feel like talking to everyone? See a movie.` }
	],
	nightout: [
		{ code: factualCodes.nightclub, desc: `💃🏼 Have a night out at the club.` },
		{ code: factualCodes.jazz, desc: `🎷 Let the jazz take over your ears.` },
		{ code: factualCodes.adult, desc: `👠 End it with some late night entertainment.` }
	],
	learn: [
		{ code: factualCodes.martialarts, desc: `🥋 Train in a martial art.` },
		{ code: factualCodes.museum, desc: `🎟 Visit a museum.` },
		{ code: factualCodes.psychic, desc: `🔮 Find out your fortune.` }
	],
	allday: [
		{ code: factualCodes.winery, desc: `🍷 Take a trip to the winery.` },
		{ code: factualCodes.cheese, desc: `🧀 Have some cheese with that wine.` },
		{ code: factualCodes.golfcourse, desc: `⛳ Air it out on the golf course.` },
		{ code: factualCodes.spa, desc: `💆🏼 Treat your body well at the spa.` },
		{ code: factualCodes.hiking, desc: `⛰ Explore a trail.` }
	],
	nogoingback: [
		{ code: factualCodes.piercing, desc: `📌 Get a body piercing.` },
		{ code: factualCodes.tattoo, desc: `🖋 Put ink on your body.` }
	],
	nature: [
		{ code: factualCodes.garden, desc: `🌺 Stroll the gardens.` },
		{ code: factualCodes.beach, desc: `🏖 Get tanned at the beach.` },
		{ code: factualCodes.park, desc: `🏕 Relax at the park.` }
	],
	sweettooth: [
		{ code: factualCodes.candy, desc: `🍭 Pig out at the candy store. No shame.` },
		{ code: factualCodes.dessert, desc: `🍰 Tons of desserts to choose from.` },
		{ code: factualCodes.icecream, desc: `🍨 Everyone loves ice cream.` }
	],
	getaway: [
		{ code: factualCodes.cruise, desc: `🛳 Go on a cruise.` },
		{ code: factualCodes.hotel, desc: `🏩 Check into a hotel.` },
		{ code: factualCodes.resort, desc: `🍹 Splurge on a resort.` }
	]
}

const factualCodeController = {
	setCodes: (req, res, next) => {
		if (res.locals.err) return next();
		const route = req.url.slice(1);
		if (route in routesAndCodes) req.params.codesToReq = routesAndCodes[route];
		else {
			res.status(404).send(`Error 404. Route '${req.url}' not found.`);
			res.locals.err = { message: `Error 404 sent to client. Route '${req.url}' not found.` };
		}
		return next();
	}
}

module.exports = factualCodeController;
