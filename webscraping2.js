/*  Web Scraping - using Axios Promise

Given an array of urls:

var urls = [
  'https://en.wikipedia.org/wiki/Futures_and_promises',
  'https://en.wikipedia.org/wiki/Continuation-passing_style',
  'https://en.wikipedia.org/wiki/JavaScript',
  'https://en.wikipedia.org/wiki/Node.js',
  'https://en.wikipedia.org/wiki/Google_Chrome'
];

*/

// Imports
var fs = require('fs'); // This package is needed for reading and writing to files
var a = require('axios'); // This package is used for making promise-based HTTP requests

// Array of URL's used for this exercise
var urls = [
  'https://en.wikipedia.org/wiki/Futures_and_promises',
  'https://en.wikipedia.org/wiki/Continuation-passing_style',
  'https://en.wikipedia.org/wiki/JavaScript',
  'https://en.wikipedia.org/wiki/Node.js',
  'https://en.wikipedia.org/wiki/Google_Chrome'
];

// Start by making the first HTTP request using axios
a.get(urls[0])
  // Process results of first HTTP request
  .then(function (htmlresponse) {
    var filename = "htmlfile1.txt";
    fs.writeFile(filename, htmlresponse.data, function (error) {
      if (error) {
        console.error(error.message);
        return;
      }
    });
    // Make second HTTP request then go to next .then block
    return a.get(urls[1]);
  })

  // Process results of second HTTP request
  .then(function (htmlresponse) {
    var filename = "htmlfile2.txt";
    fs.writeFile(filename, htmlresponse.data, function (error) {
      if (error) {
        console.error(error.message);
        return;
      }
    });
    // Make third HTTP request then go to next .then block
    return a.get(urls[2]);
  })

  // Process results of third HTTP request
  .then(function (htmlresponse) {
    var filename = "htmlfile3.txt";
    fs.writeFile(filename, htmlresponse.data, function (error) {
      if (error) {
        console.error(error.message);
        return;
      }
    });
    // Make fourth HTTP request then go to next .then block
    return a.get(urls[3]);
  })
  // Process results of fourth HTTP request
  .then(function (htmlresponse) {
    var filename = "htmlfile4.txt";
    fs.writeFile(filename, htmlresponse.data, function (error) {
      if (error) {
        console.error(error.message);
        return;
      }
    });
    // Make fifth HTTP request then go to next .then block
    return a.get(urls[4]);
  })
  // Process results of fifth HTTP request
  .then(function (htmlresponse) {
    var filename = "htmlfile5.txt";
    fs.writeFile(filename, htmlresponse.data, function (error) {
      if (error) {
        console.error(error.message);
        return;
      }
    });
  })
  // Error
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
