/* Create Artist

Write a script to create an artist.

*/

// Imports
var prompt = require('prompt-promise'); // for accepting user input - promise based
var pgp = require('pg-promise')({
  // initialization options
}); // for accessing database
var db = pgp({database: 'music'});

// Define a Promise for prompting the User for inputs
var getUserInputs = new Promise(
  function (resolve, reject) {
    var inputs = [];
    // Prompt for the artist name
    prompt('Please enter the artist name: ')
    // then save the prompt information and return as resolved
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

// Write to artist table
function writeArtist (artist_name) {
  var artist_info = {
    name: artist_name
  };
  var q = 'INSERT INTO artist \
    VALUES (default, ${name}) RETURNING id';
  db.one(q, artist_info)
    .then(function (result) {
      console.log('Created artist with ID '+ result.id);
  });
}

// Define main driver function
var main = function () {
  getUserInputs
    .then(function (inputs) {
      var artist_name = inputs[0];
      writeArtist(artist_name);
      pgp.end();
    })
    .catch(function (error) {
      console.error(error);
      pgp.end();
    });
}

// Execute the main function
main();
