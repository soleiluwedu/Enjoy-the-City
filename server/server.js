'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cli = require('./cli');
const factualCodeController = require('./factualCodeController');
const factualReqController = require('./factualReqController');
const path = require('path');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));

app.post('*', cli.request, factualCodeController.setCodes, factualReqController.getVenues, cli.response);

app.listen(PORT, () => cli.listenPort(PORT));

module.exports = app;
