'use strict';
const express = require('express');
const app = express();
const funController = require('./funController');
const path = require('path');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, '../' ))); //serves the index.html
// app.get('*', funController.getData);
app.post('*', funController.postData);
app.listen(3000);
module.exports = app;
