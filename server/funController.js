'use strict';
const cheerio = require('cheerio');
const request = require('request');
const Factual = require('factual-api');
const factual = new Factual('Jr4VU8j7IWGNP3P8tg2x21WVC58Opn0w7Zr5EUeo', 'rYkYbju3AROrBb3E4HM9PriEsCfrgzXvoTaQNJet');

const funController = {
  getData: (req, res, next) => {
    switch (req.url) {
      case '/chill': findPlaces(res, [338, 333]); break;
      case '/landmarks': findPlaces(res, [107]); break;
      case '/gardens': findPlaces(res, [109]); break;
      case '/natural': findPlaces(res, [112]); break;
      case '/beaches': findPlaces(res, [113]); break;
      case '/forests': findPlaces(res, [115]); break;
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
      const pickOne = Math.floor(Math.random() * factualRes[0].data.length);
      console.log(factualRes.map(datum => { return datum.data[pickOne].name }))
      return factualRes.map(datum => {
        let toReturn = '';
        toReturn += datum.data[pickOne].name
        toReturn += datum.data[pickOne].neighborhood ? ' in ' + datum.data[pickOne].neighborhood[0] : ''
        return toReturn;
      });
    })
    .then((results) => {
      const jsonObj = JSON.stringify(results);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(jsonObj);
      res.end();
    }).catch(err => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write("Coudn't find anything.");
      res.end();
    });
}

module.exports = funController;
