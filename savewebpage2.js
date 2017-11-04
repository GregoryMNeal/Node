/* Save a web page - Chaining promises

Functional requirements:
  1.  Use request-promise
  2.  Use fs-promise
  3.  Create a function can 'saveWebPage' which takes 2 parameters - URL and filename
  4.  The function should chain the two promises together to download the URL and save the file.

*/

// Imports
var rp = require('request-promise') // used to make HTTP request
var fs = require('fs-promise') // for file operations (e.g. read, write, etc.) - promise based
var prompt = require('prompt-promise'); // for accepting user input - promise based

// Get User inputs
function getUserInputs(inputs) {
  // Prompt for URL
  prompt('Please enter a URL: ')
  // then save URL and prompt for file name
  .then(function (value) {
    inputs.push(value);
    return prompt('Please enter File name to receive output: ');
  })
  // then save file name
  .then(function (value) {
    inputs.push(value);
    console.log(inputs);
    prompt.done();
    return inputs
  })
  // catch errors while prompting
  .catch(function (error) {
    console.error(error);
    prompt.finish();
  });
}

// Download URL and save to a file
function saveWebPage (url, filename) {
  // make HTTP request
  rp(url)
  // then write to file
  .then(function (htmlString) {
    return fs.writeFile(filename, htmlString)
  })
  // then display confirmation message
  .then(function() {
    console.log('Done')
  })
  // catch any errors with HTTP request
  .catch(function (error) {
    // execute error handling function
    httpError(error);
  });
}

// Error handling function for HTTP requests
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

// Get User Inputs
var inputs = [];
getUserInputs(inputs);

// Initialize main function parameters
var url = inputs[0];
var filename = inputs[1];

// Execute main function
saveWebPage(url, filename);
