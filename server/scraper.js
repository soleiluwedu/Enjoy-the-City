'use strict';
const cheerio = require('cheerio');
const request = require('request');
const Factual = require('factual-api');
const factual = new Factual('Jr4VU8j7IWGNP3P8tg2x21WVC58Opn0w7Zr5EUeo', 'rYkYbju3AROrBb3E4HM9PriEsCfrgzXvoTaQNJet');

const scrapeController = {
  getData: (req, res, next) => {
    switch (req.url) {
      case '/chill': findPlaces(res, [338, 333]); break;
      case '/buffet': findPlaces(res, [350]); break;
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
        resolve(factualRes);
      });
    });
    return oath;
  });
  Promise.all(vows)
    .then((factualRes) => {
      const pickOne = Math.floor(Math.random() * 20);
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
    });
}

module.exports = scrapeController;
