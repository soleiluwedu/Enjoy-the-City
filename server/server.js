'use strict';
const express = require('express');
const app = express();
const funController = require('./funController');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('*', funController.getData);
app.listen(3000);
module.exports = app;
