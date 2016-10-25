'use strict';
const cheerio = require('cheerio');
const request = require('request');
const Factual = require('factual-api');
const factual = new Factual('Jr4VU8j7IWGNP3P8tg2x21WVC58Opn0w7Zr5EUeo', 'rYkYbju3AROrBb3E4HM9PriEsCfrgzXvoTaQNJet');

const scrapeController = {
  getData: (req, res, next) => {
    if (req.url === "/chill") {
      const codes = [338, 333, 333];
      const vows = codes.map(code => {
        let oath = new Promise((resolve, reject) => {
          factual.get('/t/places-us', { filters: { "$and": [{ locality: "los angeles", category_ids: { "$includes": code } }] } }, function (error, factualRes) {
            resolve(factualRes);
          });
        });
        return oath;
      });
      Promise.all(vows)
        .then((factualRes) => {
          const pickOne = Math.random() * 20;
          console.log(factualRes.map(datum => { return datum.data[pickOne].name }))
          return factualRes.map(datum => { return datum.data[pickOne].name })//+ ' in ' + datum.data[pickOne].neighborhood[0] });
        })
        .then((results) => {
          const jsonObj = JSON.stringify(results);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(jsonObj);
          res.end();
        });
    }

    if (req.url === "/dining") {
      const oath = new Promise((resolve, reject) => {
        factual.get('/t/places-us', { filters: { "$and": [{ locality: "los angeles", category_ids: { "$includes": 338 } }, { category_ids: { "$excludes": 318 } }] } }, function (error, factualRes) {
          if (!error) resolve(factualRes);
          else reject(error);
        });
      });
      oath.then(factualRes => {
        const jsonObj = JSON.stringify(factualRes);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(jsonObj);
        res.end();
      }).catch(err => { console.log(err) });
    }
    if (req.url === "/entertainment") {
      const oath = new Promise((resolve, reject) => {
        factual.get('/t/places-us', { filters: { "$and": [{ locality: "los angeles", category_ids: { "$includes": 317 } }, { category_ids: { "$excludes": 318 } }] } }, function (error, factualRes) {
          if (!error) resolve(factualRes);
          else reject(error);
        });
      });
      oath.then(factualRes => {
        const jsonObj = JSON.stringify(factualRes);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(jsonObj);
        res.end();
      }).catch(err => { console.log(err) });
    }
    if (req.url === "/shows") {
      const oath = new Promise((resolve, reject) => {
        factual.get('/t/places-us', { filters: { "$and": [{ locality: "los angeles", category_ids: { "$includes": 333 } }, { category_ids: { "$excludes": 318 } }] } }, function (error, factualRes) {
          if (!error) resolve(factualRes);
          else reject(error);
        });
      });
      oath.then(factualRes => {
        const jsonObj = JSON.stringify(factualRes);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(jsonObj);
        res.end();
      }).catch(err => { console.log(err) });
    }
    if (req.url === "/movies") {
      const oath = new Promise((resolve, reject) => {
        factual.get('/t/places-us', { filters: { "$and": [{ locality: "los angeles", category_ids: { "$includes": 332 } }, { category_ids: { "$excludes": 318 } }] } }, function (error, factualRes) {
          if (!error) resolve(factualRes);
          else reject(error);
        });
      });
      oath.then(factualRes => {
        const jsonObj = JSON.stringify(factualRes);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(jsonObj);
        res.end();
      }).catch(err => { console.log(err) });
    }
  }
}
module.exports = scrapeController;//
