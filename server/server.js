'use strict'

const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const serverReporter = require('./serverReporter');
const factualCodeCtrl = require('./factualCodeCtrl');
const factualReqCtrl = require('./factualReqCtrl');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));

// All GET requests redirect to the main page.
app.get('*', (req, res, next) => res.redirect('/'));

// All routes begin and end with the serverside logger for report of requests and resolutions.
app.post('*', serverReporter.request, factualCodeCtrl.setCodes, factualReqCtrl.getVenues, serverReporter.response);

// Use serverside logger to log message with styling.
app.listen(PORT, () => serverReporter.listenPort(PORT));

module.exports = app;
