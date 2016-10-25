'use strict';
const express = require('express');
const app = express();
const scraperController = require('./scraper');
var Factual = require('factual-api');
var factual = new Factual('Jr4VU8j7IWGNP3P8tg2x21WVC58Opn0w7Zr5EUeo', 'rYkYbju3AROrBb3E4HM9PriEsCfrgzXvoTaQNJet');

// first sample route
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('*', scraperController.getData);

app.listen(3000);

module.exports = app;
