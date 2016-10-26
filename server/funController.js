'use strict';
const request = require('request');
const Factual = require('factual-api');
const factual = new Factual('Jr4VU8j7IWGNP3P8tg2x21WVC58Opn0w7Zr5EUeo', 'rYkYbju3AROrBb3E4HM9PriEsCfrgzXvoTaQNJet');

const funController = {
  getData: (req, res, next) => {
    switch (req.url) {
      // Cafe, Skating
      case '/firstdate': findPlaces(res, [342, 402]); break;
      // Costumes, Arcade, Middle Eastern restaurant
      case '/seconddate': findPlaces(res, [139, 463, 362]); break;
      // Italian restaurant, Show, Wine Bar
      case '/thirddate': findPlaces(res, [358, 333, 316]); break;
      // Mini Golf, Seafood restaurant, Art Gallery
      case '/fourthdate': findPlaces(res, [331, 364, 310]); break;
      // Horseback Riding, French restaurant, Dessert
      case '/fifthdate': findPlaces(res, [380, 356, 343]); break;
      // Hotel
      case '/goingwell': findPlaces([436]); break;
      // Steak
      case '/needmeat': findPlaces([365]); break;
      // Beach or Park or Lounge or Art Gallery
      case '/largegroup': findPlaces(res, [113, 118, 313, 310]); break;

      case '/landmark': findPlaces(res, [107]); break;
      case '/garden': findPlaces(res, [109]); break;
      case '/natural': findPlaces(res, [112]); break;
      case '/beach': findPlaces(res, [113]); break;
      case '/lake': findPlaces(res, [116]); break;
      case '/park': findPlaces(res, [118]); break;
      case '/bookstore': findPlaces(res, [130]); break;
      case '/costumes': findPlaces(res, [139]); break;
      case '/fashion': findPlaces(res, [142]); break;
      case '/jewelry': findPlaces(res, [144]); break;
      case '/shoes': findPlaces(res, [145]); break;
      case '/flea': findPlaces(res, [147]); break;
      case '/florist': findPlaces(res, [148]); break;
      case '/alcohol': findPlaces(res, [150]); break;
      case '/candy': findPlaces(res, [151]); break;
      case '/cheese': findPlaces(res, [152]); break;
      case '/farmersmkt': findPlaces(res, [154]); break;
      case '/pawn': findPlaces(res, [166]); break;
      case '/spgoods': findPlaces(res, [170]); break;
      case '/wedding': findPlaces(res, [176]); break;
      case '/jobs': findPlaces(res, [212]); break;
      case '/massage': findPlaces(res, [282]); break;
      case '/piercing': findPlaces(res, [283]); break;
      case '/spa': findPlaces(res, [285]); break;
      case '/tanning': findPlaces(res, [286]); break;
      case '/tattoo': findPlaces(res, [287]); break;
      case '/tailor': findPlaces(res, [304]); break;
      case '/art': findPlaces(res, [309]); break;
      case '/artgallery': findPlaces(res, [310]); break;
      case '/museum': findPlaces(res, [311]); break;
      case '/bar': findPlaces(res, [312]); break;
      case '/lounge': findPlaces(res, [313]); break;
      case '/jazz': findPlaces(res, [314]); break;
      case '/winebar': findPlaces(res, [316]); break;
      case '/adult': findPlaces(res, [318]); break;
      case '/billiards': findPlaces(res, [320]); break;
      case '/bowling': findPlaces(res, [322]); break;
      case '/hookah': findPlaces(res, [329]); break;
      case '/karaoke': findPlaces(res, [330]); break;
      case '/minigolf': findPlaces(res, [331]); break;
      case '/movie': findPlaces(res, [332]); break;
      case '/show': findPlaces(res, [333]); break;
      case '/nightclub': findPlaces(res, [334]); break;
      case '/psychic': findPlaces(res, [336]); break;
      case '/brewery': findPlaces(res, [341]); break;
      case '/cafe': findPlaces(res, [342]); break;
      case '/dessert': findPlaces(res, [343]); break;
      case '/icecream': findPlaces(res, [344]); break;
      case '/restaurant': findPlaces(res, [347]); break;
      case '/american': findPlaces(res, [348]); break;
      case '/bbq': findPlaces(res, [349]); break;
      case '/buffet': findPlaces(res, [350]); break;
      case '/burgers': findPlaces(res, [351]); break;
      case '/chinese': findPlaces(res, [352]); break;
      case '/deli': findPlaces(res, [353]); break;
      case '/diner': findPlaces(res, [354]); break;
      case '/french': findPlaces(res, [356]); break;
      case '/indian': findPlaces(res, [357]); break;
      case '/italian': findPlaces(res, [358]); break;
      case '/japanese': findPlaces(res, [359]); break;
      case '/korean': findPlaces(res, [360]); break;
      case '/mexican': findPlaces(res, [361]); break;
      case '/middleeastern': findPlaces(res, [362]); break;
      case '/pizza': findPlaces(res, [363]); break;
      case '/seafood': findPlaces(res, [364]); break;
      case '/steak': findPlaces(res, [365]); break;
      case '/sushi': findPlaces(res, [366]); break;
      case '/thai': findPlaces(res, [367]); break;
      case '/veg': findPlaces(res, [368]); break;
      case '/countryclub': findPlaces(res, [369]); break;
      case '/winery': findPlaces(res, [370]); break;
      case '/martialarts': findPlaces(res, [377]); break;
      case '/dance': findPlaces(res, [379]); break;
      case '/horseback': findPlaces(res, [380]); break;
      case '/golf': findPlaces(res, [382]); break;
      case '/hiking': findPlaces(res, [389]); break;
      case '/tennis': findPlaces(res, [399]); break;
      case '/skating': findPlaces(res, [402]); break;
      case '/yoga': findPlaces(res, [414]); break;
      case '/cruise': findPlaces(res, [431]); break;
      case '/lodging': findPlaces(res, [432]); break;
      case '/hotel': findPlaces(res, [436]); break;
      case '/resort': findPlaces(res, [438]); break;
      case '/golfcourse': findPlaces(res, [451]); break;
      case '/arcade': findPlaces(res, [463]); break;
      default:
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('Error 404. "' + req.url + '" not found.');
        res.end();
    }
  }
}

function findPlaces(res, codes) {
  const vows = codes.map(code => {
    const oath = new Promise((resolve, reject) => {
      factual.get('/t/places-us', { filters: { "$and": [{ locality: "los angeles", category_ids: { "$includes": code } }] } }, function (error, factualRes) {
        if (!error) resolve(factualRes);
        else reject(error);
      });
    });
    return oath;
  });
  Promise.all(vows)
    .then((factualRes) => {
      return factualRes.map(datum => {
        const pickOne = Math.floor(Math.random() * datum.data.length);
        let toLog = '';
        toLog += datum.data[pickOne].name;
        toLog += datum.data[pickOne].neighborhood ? ' in ' + datum.data[pickOne].neighborhood[0] : '';
        console.log(toLog);
        return datum.data[pickOne];
      });
    })
    .then((results) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(results));
      res.end();
    }).catch(err => {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.write("No data found.");
      res.end();
    });
}

module.exports = funController;
