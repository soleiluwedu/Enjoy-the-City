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

app.get('/', scraperController.getData);
app.get('/chill', scraperController.getData);
app.get('/shows', scraperController.getData);
app.get('/dining', scraperController.getData);
app.get('/movies', scraperController.getData);
app.get('/entertainment', scraperController.getData);
app.get('/cs', scraperController.getData);
app.get('/hr', scraperController.getData);
app.get('*', (req, res, next) => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('Error 404. "' + req.url + '" not found.');
  res.end();
});
app.listen(3000);

module.exports = app;
