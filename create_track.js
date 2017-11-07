/* Create Track

Write a script to create a track.

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
    // Prompt for the track name
    prompt('Please enter the track name: ')
    // then save the track name and prompt for the album ID
    .then(function (value) {
      inputs.push(value);
      return prompt('Please enter the album ID: ');
    })
    // then save the album ID and prompt for the track duration
    .then(function (value) {
      inputs.push(value);
      return prompt('Please enter the track duration: ');
    })
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

// Write to album table
function writeTrack (track_name, album_id, track_duration) {
  var track_info = {
    name: track_name,
    duration: track_duration,
    album_id: album_id
  };
  var q = 'INSERT INTO track \
    VALUES (default, ${name}, ${duration}, ${album_id}) RETURNING id';
  db.one(q, track_info)
    .then(function (result) {
      console.log('Created track with ID '+ result.id);
  });
}

// Define main driver function
var main = function () {
  getUserInputs
    .then(function (inputs) {
      var track_name = inputs[0];
      var album_id = inputs[1];
      var track_duration = inputs[2];
      writeTrack(track_name, album_id, track_duration);
      pgp.end();
    })
    .catch(function (error) {
      console.error(error);
      pgp.end();
    });
}

// Execute the main function
main();
