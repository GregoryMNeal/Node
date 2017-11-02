/* Save a web page - Chaining promises

Functional requirements:
  1.  Use request-promise
  2.  Use fs-promise
  3.  Create a function can 'saveWebPage' which takes 2 parameters - URL and filename
  4.  The function should chain the two promises together to download the URL and save the file.

*/

// Imports
var rp = require('request-promise') // for HTTP requests
var fs = require('fs-promise') // for file operations (e.g. read, write, etc.) - promise based

function saveWebPage (url, filename) {
  rp(url)
    .then(function (htmlString) {
      return fs.writeFile(filename, htmlString)
    })
    .then(function() {
      console.log('Done')
    })
    // Error
    .catch(function (error) {
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
      } else {
        console.error('* Config error *');
        console.error(error.config);
      }
    });
}

var url = 'http://www.google.com';
var filename = 'htmlgoogle.txt';

// Execute the function
saveWebPage(url, filename);
