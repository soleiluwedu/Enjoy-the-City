`use strict`;

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
  postData: (req, res) => {
    console.log(`✉️ ${style.green}${style.bold}POST${style.reset}${style.green} request received for ${style.red}${style.bold}${req.url}${style.reset}`)
    switch (req.url) {
      // Cafe, Skating
      case `/firstdate`: findPlaces(res, [
        [342, `First date is the crazy-check. Start with a cafe.`],
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [402, `If it goes well, how about skating?`]
          : [463, `If it goes well, how about the arcade?`]
      ]); break;
      // Costumes, Arcade, Middle Eastern restaurant
      case `/seconddate`: findPlaces(res, [
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [139, `Try on some costumes.`]
          : [336, `See a psychic together.`],
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [311, `Visit a museum.`]
          : [331, `Go mini-golfing.`],
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [362, `Relax with some Middle Eastern cuisine.`]
          : [359, `Have some Japanese.`]
      ]); break;
      // Italian restaurant, Show, Wine Bar
      case `/thirddate`: findPlaces(res, [
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [358, `Let's start with dinner at an Italian restaurant.`]
          : [364, `Let's start with dinner at a seafood restaurant.`],
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [333, `Go see a show.`]
          : [330, `Sing karaoke and embarrass yourself.`],
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [316, `Talk about it over wine.`]
          : [313, `Relax and talk to each other at a lounge.`]
      ]); break;
      // Mini Golf, Seafood restaurant, Art Gallery
      case `/fourthdate`: findPlaces(res, [
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [311, `Start the day at a museum.`]
          : [331, `Start with mini-golf.`],
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [364, `Enjoy some seafood.`]
          : [366, `Enjoy sushi.`],
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [282, `Get massages together.`]
          : [148, `Maybe flowers are in order.`]
      ]); break;
      // Horseback Riding, French restaurant, Dessert
      case `/fifthdate`: findPlaces(res, [
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [389, `Go hiking.`]
          : [380, `Go horseback riding.`],
        Math.ceil(Math.random() * 2) % 2 === 1
          ? [356, `Dine at a French restaurant.`]
          : [414, `Take a yoga class together.`],
        [343, `If this person made it to a fifth date, he/she deserves dessert.`]
      ]); break;
      // Hotel
      case `/goingwell`: findPlaces(res, [
        [436, `Is the date going well?`]
      ]); break;
      // BBQ, Steak
      case `/meat`: findPlaces(res, [
        [349, `Go to a BBQ joint.`],
        [365, `Or have a nice steak.`]
      ]); break;
      // Vegan / vegetarian
      case `/nomeat`: findPlaces(res, [
        [368, `Not eating anything that had parents.`]
      ]); break;
      // Beach or Park or Lounge or Resort
      case `/largegroup`: findPlaces(res, [
        [113, `How about the beach?`],
        [118, `Or maybe the park?`],
        [313, `Maybe chill at a lounge.`],
        [332, `Don't feel like talking to everyone? See a movie.`]
      ]); break;
      // Nightclub, Jazz, Adult
      case `/nightout`: findPlaces(res, [
        [334, `Have a night out at the club.`],
        [314, `Let the jazz take over your ears.`],
        [318, `End it with some late night entertainment.`]
      ]); break;
      // Martial arts, Museum, Psychic
      case `/learn`: findPlaces(res, [
        [377, `Train in a martial art.`],
        [311, `Visit a museum.`],
        [336, `Find out your fortune.`]
      ]); break;
      // Winery, Cheese, Golf course, Spa, Hiking
      case `/allday`: findPlaces(res, [
        [370, `Take a trip to the winery.`],
        [152, `Have some cheese with that wine.`],
        [451, `Air it out on the golf course.`],
        [285, `Treat your body well at the spa.`],
        [389, `Explore a trail.`]
      ]); break;
      // Piercings, Tattooes
      case `/nogoingback`: findPlaces(res, [
        [283, `Get a body piercing.`],
        [287, `Put ink on your body.`]
      ]); break;
      // Garden, Natural, Beach, Park
      case `/nature`: findPlaces(res, [
        [109, `Stroll the gardens.`],
        [113, `Get tanned at the beach.`],
        [118, `Relax at the park.`]
      ]); break;
      // Candy, Dessert, Ice Cream
      case `/sweettooth`: findPlaces(res, [
        [151, `Pig out at the candy store. No shame.`],
        [343, `Tons of desserts to choose from.`],
        [344, `Everyone loves ice cream.`]
      ]); break;
      // Cruise, Hotel, Resort
      case `/getaway`: findPlaces(res, [
        [431, `Go on a cruise.`],
        [436, `Check into a hotel.`],
        [438, `Splurge on a resort.`]
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
      default:
        res.writeHead(404, { "Content-Type": `text/html` });
        res.write(`Error 404. '${req.url}' not found.`);
        res.end();
    }
  }
}

// Gets data from Factual.com API and returns it to client
const findPlaces = (res, codes) => {
  const vows = codes.map(code => {
    const oath = new Promise((resolve, reject) => {
      factual.get(`/t/places-us`, { filters: { "$and": [{ locality: "los angeles", category_ids: { "$includes": code[0] } }] } }, (error, factualRes) => {
        if (!error) resolve([factualRes, code[1]]);
        else reject(error);
      });
    });
    return oath;
  });
  console.time(`⏰ ${style.magenta}Timing promises${style.reset}`);
  Promise.all(vows)
    .then((factualRes) => {
      return factualRes.map(pair => {
        const pickOne = Math.floor(Math.random() * pair[0].data.length);
        let venue = ``;
        venue += pair[0].data[pickOne].name;
        venue += pair[0].data[pickOne].neighborhood ? ` in ${pair[0].data[pickOne].neighborhood[0]}` : ``;
        console.log(`${style.cyan}${venue}${style.reset}`);
        return [pair[0].data[pickOne], pair[1]];
      });
    })
    .then((results) => {
      res.writeHead(200, { "Content-Type": `application/json` });
      res.write(JSON.stringify(results));
      res.end();
      // console.trace("Promises resolved");
      console.timeEnd(`⏰ ${style.magenta}Timing promises${style.reset}`);
    })
    .catch(err => {
      console.log(err);
      res.writeHead(500, { "Content-Type": `text/html` });
      res.write(`No data found.`);
      res.end();
    });
}

module.exports = funController;
