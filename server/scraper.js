'use strict';

const cheerio = require('cheerio');
const request = require('request');

const scrapeController = {
  getData: (req, res, next) => {
    if (req.url === "/") {
      request('http://codesmith.io', (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          const title = $('title').text();
          const date = $('.banner').text();
          const obj = {};
          obj["title"] = title;
          obj["date"] = date;
          const jsonObj = JSON.stringify(obj);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(jsonObj);
          res.end();
        }
      })
    }
    if (req.url === "/hr") {
      const options = {
        url: 'http://www.hackreactor.com',
        headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:51.0) Gecko/20100101 Firefox/51.0'}
      };
      request(options, (error, response, html) => {
        if (!error) {
          const $ = cheerio.load(html);
          const obj = {};
          const title = $('title').text();
          const date = $('.lined-cta__link-text').text().split(" ").filter(e => e && e !== '\n').map(e => e.trim()).join(" ").trim();
          obj["title"] = title;
          obj["date"] = date;
          const hrefToFollow = $('.main-nav__list li:first-child').find('a').attr('href');
          var oath = new Promise(function (resolve, reject) {
            var options2 = {
              url: options.url + hrefToFollow,
              headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:51.0) Gecko/20100101 Firefox/51.0'}
            };
            request(options2, (error, response, html) => {
              if (!error) resolve(html);
              else reject(error);
            });
          });
          oath.then(function (html) {
            const $ = cheerio.load(html);
            const tuition = $('.cost').text();
            obj["tuition"] = tuition;
            const jsonObj = JSON.stringify(obj); // Don't send data back to client until promise resolved
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(jsonObj);
            res.end();
          }).catch(function (err) {console.log("Error: " + err);});
        }
      });
    }
  }
}
module.exports = scrapeController;//
