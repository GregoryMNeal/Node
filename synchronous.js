/* Example of synchronous processing

This program will prompt the User for two input variables, a URL and the name of a file.  It will then make a HTTP request to the URL and write the HTML source code to the file selected by the User.

*/

// Imports
var prompt = require('prompt-promise'); // for accepting user input - promise based
var rp = require('request-promise'); // for making HTTP requests - promise based
var fs = require('fs-promise'); // for file operations (e.g. read, write, etc.) - promise based

// Define a Promise for prompting the User for inputs
var getUserInputs = new Promise(
  function (resolve, reject) {
    var inputs = [];
    // Prompt for the URL
    prompt('Please enter a URL: ')
    // then save the URL and prompt for the file name
    .then(function (value) {
      inputs.push(value);
      return prompt('Please enter File name to receive output: ');
    })
    // then save the file name and return as resolved
    .then(function (value) {
      inputs.push(value);
      prompt.done();
      resolve(inputs);
    })
    // catch errors while prompting and return as rejected
    .catch(function (error) {
      prompt.finish();
      reject(error);
    });
  }
);

// Download HTML for a URL and save it to a file
function saveWebPage (url, filename) {
  // make HTTP request
  rp(url)
  // then write to a file
  .then(function (htmlString) {
    fs.writeFile(filename, htmlString)
  })
  // catch any errors with HTTP request
  .catch(function (error) {
    httpError(error);
  });
}

// Error handling for HTTP requests
function httpError (error) {
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    console.error('* Response error *')
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('* Request made, no response *');
    console.error(error.request);
  } else if (error.message) {
    // Something happened in setting up the request that triggered an error
    console.error('* Setup error *');
    console.error(error.message);
  } else if (error.config) {
    console.error('* Config error *');
    console.error(error.config);
  } else {
    console.error(error);
  }
}

// Define main driver function
var main = function () {
  getUserInputs
    .then(function (inputs) {
      var url = inputs[0];
      var filename = inputs[1];
      saveWebPage(url, filename);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Execute the main function
main();
