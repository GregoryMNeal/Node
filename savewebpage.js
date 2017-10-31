/*  Node.js Exercise - Save a web page

Functional requirements:
  1.  Prompt the User for a URL
  2.  Prompt the User for a file name to save the web page to
  3.  Write the HTML source code for the URL to the output file
  4.  Trigger an error condition by running the program with an invalid URL, ensure the error is properly displayed.
  5.  Trigger an error condition by running the program with an output file in a non-existent directory, ensure the error is properly displayed.

Example:
  $ node save_web_page.js
  URL: https://css-tricks.com/creating-book-cover-using-javascript-p5-js/
  Save to file: cover-book.html
  Saved to file cover-book.html

  As result cover-book.html should have the HTML source code from the entered URL.

*/

// Prep for User Input
var readline = require('readline');
var r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Requirement #1 - Prompt the User for a URL
r1.question("Please enter a URL: ", function(url) {
  // Get the HTML source code for the web page
  var request = require('request');
  request.get(url, function (error, response, html) {
    if (error) {
      // Requirement #4 - Trigger an error condition by running the program with an invalid URL, ensure the error is properly displayed.
      console.error(error.message);
      return;
    }
    // Requirement #2 - Prompt the User for a file name to save the web page to
    r1.question("Save to file: ", function(outputfile) {
      // Requirement #3 - Write the HTML source code for the URL to the output file
      var fs = require('fs');
      fs.writeFile(outputfile, html, function (error) {
        r1.close();
        if (error) {
          // Requirement #5 - Trigger an error condition by running the program with an output file in a non-existent directory, ensure the error is properly displayed.
          console.error(error.message);
          return;
        }
        // Write confirmation message
        console.log("Saved to file ", outputfile);
      });
    });
  });
});
