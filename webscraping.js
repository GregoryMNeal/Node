/*  Web Scraping - using Promise

Given an array of urls:

var urls = [
  'https://en.wikipedia.org/wiki/Futures_and_promises',
  'https://en.wikipedia.org/wiki/Continuation-passing_style',
  'https://en.wikipedia.org/wiki/JavaScript',
  'https://en.wikipedia.org/wiki/Node.js',
  'https://en.wikipedia.org/wiki/Google_Chrome'
];
Use Promise.all and request-promise to retrieve the HTML files for all the web pages.

*/

var urls = [
  'https://en.wikipedia.org/wiki/Futures_and_promises',
  'https://en.wikipedia.org/wiki/Continuation-passing_style',
  'https://en.wikipedia.org/wiki/JavaScript',
  'https://en.wikipedia.org/wiki/Node.js',
  'https://en.wikipedia.org/wiki/Google_Chrome'
];

var rp = require('request-promise');

Promise.all([rp(urls[0]),
             rp(urls[1]),
             rp(urls[2]),
             rp(urls[3]),
             rp(urls[4])])
  .then(function (htmlresponse) {
    console.log(htmlresponse);
  });
