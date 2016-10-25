'use strict';
const cheerio = require('cheerio');
const request = require('request');
const Factual = require('factual-api');
const factual = new Factual('Jr4VU8j7IWGNP3P8tg2x21WVC58Opn0w7Zr5EUeo', 'rYkYbju3AROrBb3E4HM9PriEsCfrgzXvoTaQNJet');


const scrapeController = {
  getData: (req, res, next) => {
    if (req.url === "/entertainment") {
      const oath = new Promise((resolve, reject) => {
        factual.get('/t/places-us', {filters:{"$and":[{locality:"los angeles", category_ids:{"$includes":317}},{category_ids:{"$excludes":318}}]}}, function (error, factualRes) {
          if (!error) resolve(factualRes);
          else reject(error);
        });
      });
      oath.then(factualRes => {
        // console.log("show " + factualRes.included_rows + "/" + factualRes.total_row_count + " rows:", factualRes.data);
        console.log("Places returned:", factualRes.included_rows);
        const jsonObj = JSON.stringify(factualRes);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(jsonObj);
        res.end();
      }).catch(err => { console.log(err) });
    }
    if (req.url === "/shows") {
      const oath = new Promise((resolve, reject) => {
        factual.get('/t/places-us', {filters:{"$and":[{locality:"los angeles", category_ids:{"$includes":333}},{category_ids:{"$excludes":318}}]}}, function (error, factualRes) {
          if (!error) resolve(factualRes);
          else reject(error);
        });
      });
      oath.then(factualRes => {
        // console.log("show " + factualRes.included_rows + "/" + factualRes.total_row_count + " rows:", factualRes.data);
        console.log("Places returned:", factualRes.included_rows);
        const jsonObj = JSON.stringify(factualRes);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(jsonObj);
        res.end();
      }).catch(err => { console.log(err) });
    }

    if (req.url === "/cs") {
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
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:51.0) Gecko/20100101 Firefox/51.0' }
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
          const oath = new Promise((resolve, reject) => {
            const hrOptions = {
              url: options.url + hrefToFollow,
              headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:51.0) Gecko/20100101 Firefox/51.0' }
            };
            request(hrOptions, (error, response, html) => {
              if (!error) resolve(html);
              else reject(error);
            });
          });
          oath.then(html => {
            const $ = cheerio.load(html);
            const tuition = $('.cost').text();
            obj["tuition"] = tuition;
            const jsonObj = JSON.stringify(obj); // Don't send data back to client until promise resolved
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(jsonObj);
            res.end();
          }).catch(err => { console.log("Error:", err) });
        }
      });
    }
  }
}
module.exports = scrapeController;//
