'use strict';
const express = require('express');
const app = express();
const funController = require('./funController');
const path = require('path');
const PORT = 5300;

const style = {
    reset: `\x1b[0m`,
    bold: `\x1b[1m`,
    underline: `\x1b[4m`,
    inverse: `\x1b[7m`,
    black: `\x1b[30m`,
    white: `\x1b[37m`,
    red: `\x1b[31m`,
    green: `\x1b[32m`,
    yellow: `\x1b[33m`,
    blue: `\x1b[34m`,
    magenta: `\x1b[35m`,
    cyan: `\x1b[36m`
}

app.use(express.static(path.join(__dirname, '../')));

app.post('*', funController.postData);

app.listen(PORT, () => { console.log(`🤘 ${style.bold}${style.blue}Ready to rock on port ${PORT}${style.reset}`) });

module.exports = app;
